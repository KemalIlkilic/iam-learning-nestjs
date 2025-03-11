import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlayListDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private songsRepo: Repository<Song>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDto): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name;
    // songs will be the array of IDs that we are getting from the DTO object
    const songs = await this.songsRepo.findBy({
      id: In(playListDTO.songs),
    });
    playList.songs = songs;
    const user = await this.userRepo.findOneBy({ id: playListDTO.user });
    if (!user) {
      throw new Error(`User with id ${playListDTO.user} not found`);
    }
    playList.user = user;
    return this.playlistRepo.save(playList);
  }
}
