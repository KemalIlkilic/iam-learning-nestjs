import { Controller, Get, Put, Delete, Post } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create() {
    return this.songsService.create('Yildizlar by Reckol');
  }
  @Get()
  findAll() {
    return this.songsService.findAll();
  }
  @Get(':id')
  findOne() {
    return 'fetch song on the based on id';
  }
  @Put(':id')
  update() {
    return 'update song on the based on id';
  }
  @Delete(':id')
  delete() {
    return 'delete a song on the based on id';
  }
}
