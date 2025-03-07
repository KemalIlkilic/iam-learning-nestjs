import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // local DB
  // local array
  //The readonly modifier in TypeScript prevents reassignment of the property itself,
  // but it does not make the contents of the array immutable
  private readonly songs: any[] = [];
  create(song: any) {
    // Save the song in the database
    this.songs.push(song);
    return this.songs;
  }
  findAll() {
    // fetch the songs from the db
    return this.songs;
  }
}
