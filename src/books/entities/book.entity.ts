import { Author } from 'src/authors/entities/author.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  chapters: number;

  @Column()
  pages: number;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable()
  authors: Author[];
}
