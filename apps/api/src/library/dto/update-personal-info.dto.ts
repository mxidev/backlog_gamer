import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdatePersonalInfoDto {
  @IsString()
  @IsOptional()
  platform?: string | null;

  @IsString()
  @IsOptional()
  startDate?: string | null;

  @IsString()
  @IsOptional()
  endDate?: string | null;

  @IsString()
  @IsOptional()
  personalNote?: string | null;

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  rating?: number | null;
}
