import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BookCreateInput) {
    try {
      return await this.prisma.book.create({
        data,
        include: { author: true },
      });
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  async findAll() {
    const books = await this.prisma.book.findMany({
      include: { author: true },
    });
    
    // Sort by author name, then published year, then title
    return books.sort((a, b) => {
      // First sort by author name
      const authorCompare = a.author.name.localeCompare(b.author.name);
      if (authorCompare !== 0) return authorCompare;
      
      // Then by published year (oldest first)
      const yearA = a.publishedYear ?? 0;
      const yearB = b.publishedYear ?? 0;
      if (yearA !== yearB) return yearA - yearB;
      
      // Finally by title
      return a.title.localeCompare(b.title);
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }
    return book;
  }

  async update(id: number, data: Prisma.BookUpdateInput) {
    await this.findOne(id);
    try {
      return await this.prisma.book.update({
        where: { id },
        data,
        include: { author: true },
      });
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.book.delete({ where: { id } });
    return { deleted: true };
  }
}
