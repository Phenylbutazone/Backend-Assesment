import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.AuthorCreateInput) {
    return this.prisma.author.create({ data });
  }

  findAll() {
    return this.prisma.author.findMany({
      include: { books: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const author = await this.prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });
    if (!author) {
      throw new NotFoundException(`Author ${id} not found`);
    }
    return author;
  }

  async update(id: number, data: Prisma.AuthorUpdateInput) {
    await this.findOne(id);
    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.author.delete({ where: { id } });
    return { deleted: true };
  }
}
