import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface GameSearchResult {
  id: number;
  name: string;
  backgroundImage: string | null;
  released: string | null;
}

@Injectable()
export class CatalogService {
  private readonly logger = new Logger(CatalogService.name);
  private readonly apiUrl = 'https://api.rawg.io/api/games';

  constructor(private readonly httpService: HttpService) {}

  async searchGames(query: string): Promise<GameSearchResult[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.apiUrl, {
          params: {
            search: query,
            key: process.env.RAWG_API_KEY,
            page_size: 20,
          },
        }),
      );

      return response.data.results.map((game: any) => ({
        id: game.id,
        name: game.name,
        backgroundImage: game.background_image,
        released: game.released,
      }));
    } catch (error) {
      this.logger.error('Error searching games from RAWG API', error);
      throw new Error('Failed to search games');
    }
  }
}
