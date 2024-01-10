import { IsString, IsInt, IsNotEmpty, IsArray } from 'class-validator';
export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  chapters: number;

  @IsInt()
  @IsNotEmpty()
  pages: number;

  @IsArray()
  @IsNotEmpty()
  authors: number[];
}
