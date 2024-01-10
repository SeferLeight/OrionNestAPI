import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll() {
    return this.authorRepository.find({ relations: ['books'] });
  }

  async findOne(id: number) {
    const author = this.authorRepository.findOne({
      where: { id },
    });
    if (!author) throw new BadRequestException('Author not found');
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.findOne(id);
    if (!author) throw new BadRequestException('Author not found');
    Object.assign(author, updateAuthorDto);
    return await this.authorRepository.save(author);
  }

  async remove(id: number) {
    const author = await this.findOne(id);
    if (!author) throw new BadRequestException('Author not found');
    return await this.authorRepository.remove(author);
  }
}
