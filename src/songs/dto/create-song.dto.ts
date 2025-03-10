import {
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title;

  @IsNotEmpty()
  @IsArray()
  //Decorated with @IsString({ each: true }) to ensure each element in the array is a string.
  @IsNumber({}, { each: true })
  readonly artists;

  @IsDateString()
  @IsNotEmpty()
  //year/month/day
  //2021-06-29
  readonly releasedDate: Date;

  //HH:MM format. (military time)
  @IsMilitaryTime()
  @IsNotEmpty()
  //14:30
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics?: string;
}
