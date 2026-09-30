import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class AddGameDto {
  @IsNumber()
  @IsNotEmpty()
  externalGameId!: number;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  coverImage?: string | null;

  @IsString()
  @IsOptional()
  released?: string | null;
}
