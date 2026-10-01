import { IsOptional, IsString, IsEnum } from 'class-validator';

export class SearchLibraryDto {
  @IsString()
  @IsOptional()
  q?: string;

  @IsEnum(['pending', 'playing', 'completed', 'abandoned'])
  @IsOptional()
  status?: 'pending' | 'playing' | 'completed' | 'abandoned';

  @IsEnum(['title', 'addedAt'])
  @IsOptional()
  sortBy?: 'title' | 'addedAt';

  @IsEnum(['asc', 'desc'])
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
