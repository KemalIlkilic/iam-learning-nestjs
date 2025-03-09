import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
  ) {}

  async findAll(): Promise<Song[]> {
    return await this.songRepository.find();
  }

  async create(songData: CreateSongDto): Promise<Song> {
    const newSong = this.songRepository.create(songData);
    return await this.songRepository.save(newSong);
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
