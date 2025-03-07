import {
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title;
  @IsNotEmpty()
  @IsArray()
  //Decorated with @IsString({ each: true }) to ensure each element in the array is a string.
  @IsString({ each: true })
  readonly artists;
  @IsDateString()
  @IsNotEmpty()
  readonly releasedDate: Date;
  //HH:MM format. (military time)
  //14:30
  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;
}
