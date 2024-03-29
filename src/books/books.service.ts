/* eslint-disable no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { In, Repository } from 'typeorm';
import { Author } from '../authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll() {
    return await this.bookRepository.find({ relations: ['authors'] });
  }

  async create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create({
      title: createBookDto.title,
      chapters: createBookDto.chapters,
      pages: createBookDto.pages,
    });
    if (createBookDto.authors) {
      book.authors = await this.authorRepository.findBy({
        id: In(createBookDto.authors),
      });
    }
    return await this.bookRepository.save(book);
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { authors: true },
    });
    if (!book) throw new BadRequestException('Book not found');
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({
      where: { id },
    });
    book.title = updateBookDto.title;
    book.chapters = updateBookDto.chapters;
    book.pages = updateBookDto.pages;
    if (updateBookDto.authors) {
      book.authors = await this.authorRepository.findBy({
        id: In(updateBookDto.authors),
      });
    }
    return await this.bookRepository.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    if (!book) throw new BadRequestException('Book not found');
    return await this.bookRepository.remove(book);
  }

  async pagesChapterProm(id: number) {
    const book = await this.findOne(id);
    if (!book) throw new BadRequestException('Book not found');
    return {
      id: String(book.id),
      average: String((book.pages / book.chapters).toFixed(2)),
    };
  }
}
