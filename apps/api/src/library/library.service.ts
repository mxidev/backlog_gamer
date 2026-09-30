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

  async updatePersonalInfo(
    userId: string,
    gameId: string,
    updates: {
      platform?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      personalNote?: string | null;
      rating?: number | null;
    },
  ): Promise<LibraryGame> {
    const game = this.library.find((g) => g.id === gameId);

    if (!game) {
      throw new NotFoundException('Juego no encontrado');
    }

    if (game.userId !== userId) {
      throw new ForbiddenException('No puedes modificar juegos de otros usuarios');
    }

    if (updates.platform !== undefined) game.platform = updates.platform;
    if (updates.startDate !== undefined) game.startDate = updates.startDate;
    if (updates.endDate !== undefined) game.endDate = updates.endDate;
    if (updates.personalNote !== undefined) game.personalNote = updates.personalNote;
    if (updates.rating !== undefined) game.rating = updates.rating;

    return game;
  }

  async deleteGame(userId: string, gameId: string): Promise<void> {
    const gameIndex = this.library.findIndex((g) => g.id === gameId);

    if (gameIndex === -1) {
      throw new NotFoundException('Juego no encontrado');
    }

    const game = this.library[gameIndex];

    if (game.userId !== userId) {
      throw new ForbiddenException('No puedes eliminar juegos de otros usuarios');
    }

    this.library.splice(gameIndex, 1);
  }
}
