import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create(@Body() createSongDTO: CreateSongDto) {
    const results = this.songsService.create(createSongDTO);
    return results;
  }

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `fetch song on the based on id: ${id} ${typeof id}`;
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
