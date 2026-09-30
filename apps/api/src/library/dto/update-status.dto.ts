import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(['pending', 'playing', 'completed', 'abandoned'])
  status!: 'pending' | 'playing' | 'completed' | 'abandoned';
}
