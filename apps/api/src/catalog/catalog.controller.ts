import { Controller, Get, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('api/v1/catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('search')
  async searchGames(@Query('q') query: string) {
    if (!query || query.trim().length === 0) {
      return [];
    }
    return this.catalogService.searchGames(query.trim());
  }
}
