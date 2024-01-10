import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';

describe('AuthorsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET Authors', () => {
    return request(app.getHttpServer())
      .get('/authors')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('Create and delete author', async () => {
    const newAuthor: CreateAuthorDto = {
      name: 'Test Author',
    };
    const author = await request(app.getHttpServer())
      .post('/authors')
      .send(newAuthor)
      .expect(201);

    const authorId = author.body.id;

    return request(app.getHttpServer())
      .delete(`/authors/${authorId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
