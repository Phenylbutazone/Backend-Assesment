import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type { Prisma } from '@prisma/client';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Body()
    body: {
      title: string;
      isbn?: string;
      publishedYear?: number;
      genre?: string;
      quantity?: number;
      authorId: number;
    },
  ) {
    try {
      const { authorId, quantity, ...rest } = body;
      const data: Prisma.BookCreateInput = {
        ...rest,
        author: { connect: { id: authorId } },
      };
      
      let quantityValue = 0;
      if (quantity !== undefined && quantity !== null) {
        const quantityNum = Number(quantity);
        if (!isNaN(quantityNum) && quantityNum >= 0) {
          quantityValue = quantityNum;
        }
      }
      data.quantity = quantityValue;
      
      return await this.booksService.create(data);
    } catch (error) {
      console.error('Error in create controller:', error);
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      title?: string;
      isbn?: string;
      publishedYear?: number;
      genre?: string;
      quantity?: number;
      authorId?: number;
    },
  ) {
    const { authorId, quantity, ...rest } = body;
    const data: Prisma.BookUpdateInput = { ...rest };
    
    if (quantity !== undefined && quantity !== null) {
      const quantityNum = Number(quantity);
      if (!isNaN(quantityNum)) {
        data.quantity = quantityNum;
      }
    }
    
    if (authorId !== undefined) {
      data.author = { connect: { id: authorId } };
    }
    
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
