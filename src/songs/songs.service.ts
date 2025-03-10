import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }

  async findAll(): Promise<Song[]> {
    return await this.songRepository.find();
  }

  async create(songData: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songData.title;
    song.artists = songData.artists;
    song.duration = songData.duration;
    song.lyrics = songData.lyrics ?? null;
    song.releasedDate = songData.releasedDate;
    const artists = await this.artistRepository.findBy({
      id: In(songData.artists),
    });
    song.artists = artists;
    return await this.songRepository.save(song);
  }
  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });
    if (!song) {
      throw new Error(`Song with id ${id} not found`);
    }
    return song;
  }
  async update(
    id: number,
    recordToUpdate: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songRepository.update(id, recordToUpdate);
  }
  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }
}
