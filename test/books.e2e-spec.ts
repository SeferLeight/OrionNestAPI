import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('Create and delete book', async () => {
    const newAuthor: CreateAuthorDto = {
      name: 'Test Author',
    };
    const author = await request(app.getHttpServer())
      .post('/authors')
      .send(newAuthor)
      .expect(201);

    const authorId = author.body.id;

    const newBook: CreateBookDto = {
      title: 'Test Book',
      chapters: 5,
      pages: 100,
      authors: [authorId],
    };

    const book = await request(app.getHttpServer())
      .post('/books')
      .send(newBook)
      .expect(201);

    const bookId: number = book.body.id;

    await request(app.getHttpServer()).delete(`/books/${bookId}`).expect(200);
    return request(app.getHttpServer())
      .delete(`/authors/${authorId}`)
      .expect(200);
  });

  it('Check AVG pages', async () => {
    const author = await request(app.getHttpServer())
      .post('/authors')
      .send({
        name: 'Test Author',
      })
      .expect(201);

    const authorId = author.body.id;

    const newBook: CreateBookDto = {
      title: 'Test Book',
      chapters: 10,
      pages: 100,
      authors: [authorId],
    };

    const book = await request(app.getHttpServer())
      .post('/books')
      .send(newBook)
      .expect(201);
    const bookId: number = book.body.id;

    const avg = await request(app.getHttpServer())
      .get(`/books/${bookId}/avg-pages`)
      .expect(200);

    return expect(avg.body.average).toBe('10.00');
  });

  afterAll(async () => {
    await app.close();
  });
});
