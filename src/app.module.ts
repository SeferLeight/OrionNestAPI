import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';
import { Author } from './authors/entities/author.entity';

@Module({
  imports: [
    BooksModule,
    AuthorsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_test',
      password: 'root',
      database: 'orion_test',
      synchronize: true,
      entities: [Book, Author],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
