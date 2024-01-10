import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.authorsService.findOne(id);
  }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.authorsService.remove(id);
  }
}
