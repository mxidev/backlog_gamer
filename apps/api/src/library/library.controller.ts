import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { LibraryService } from './library.service';
import { AddGameDto } from './dto/add-game.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/library')
@UseGuards(JwtAuthGuard)
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('games')
  async addGame(@Req() req: any, @Body() dto: AddGameDto) {
    const userId = req.user.id;
    return this.libraryService.addGame(
      userId,
      dto.externalGameId,
      dto.title,
      dto.coverImage || null,
      dto.released || null,
    );
  }

  @Get('games')
  async getUserLibrary(@Req() req: any) {
    const userId = req.user.id;
    return this.libraryService.getUserLibrary(userId);
  }
}
