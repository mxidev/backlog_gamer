import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { LibraryGame } from './library.entity';

@Injectable()
export class LibraryService {
  private library: LibraryGame[] = [];

  async addGame(
    userId: string,
    externalGameId: number,
    title: string,
    coverImage: string | null,
    released: string | null,
  ): Promise<LibraryGame> {
    const existing = this.library.find(
      (game) => game.userId === userId && game.externalGameId === externalGameId,
    );

    if (existing) {
      throw new ConflictException('Este juego ya está en tu biblioteca');
    }

    const newGame: LibraryGame = {
      id: crypto.randomUUID(),
      userId,
      externalGameId,
      title,
      coverImage,
      released,
      status: 'pending',
      addedAt: new Date(),
    };

    this.library.push(newGame);
    return newGame;
  }

  async getUserLibrary(userId: string): Promise<LibraryGame[]> {
    return this.library.filter((game) => game.userId === userId);
  }

  async updateGameStatus(
    userId: string,
    gameId: string,
    status: LibraryGame['status'],
  ): Promise<LibraryGame> {
    const game = this.library.find((g) => g.id === gameId);

    if (!game) {
      throw new NotFoundException('Juego no encontrado');
    }

    if (game.userId !== userId) {
      throw new ForbiddenException('No puedes modificar juegos de otros usuarios');
    }

    game.status = status;
    return game;
  }
}
