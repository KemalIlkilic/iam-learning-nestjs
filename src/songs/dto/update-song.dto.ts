import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists;

  @IsDateString()
  @IsOptional()
  readonly releasedDate?: Date;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration?: Date;

  @IsString()
  @IsOptional()
  readonly lyrics?: string;
}
