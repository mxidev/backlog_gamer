import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../library/library.service';
import { CatalogService, GameSearchResult } from './catalog.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchComponent {
  searchQuery = '';
  results: GameSearchResult[] = [];
  loading = false;
  error = '';
  addedGames = new Set<number>();
  addingGame: number | null = null;
  private searchTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private catalogService: CatalogService,
    private libraryService: LibraryService,
    private cdr: ChangeDetectorRef,
  ) {}

  onSearch(): void {
    clearTimeout(this.searchTimeout);

    if (!this.searchQuery.trim()) {
      this.results = [];
      this.error = '';
      this.loading = false;
      return;
    }

    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, 500);
  }

  private performSearch(): void {
    this.loading = true;
    this.error = '';

    this.catalogService.searchGames(this.searchQuery.trim()).subscribe({
      next: (results) => {
        this.results = results;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al buscar videojuegos. Intenta de nuevo.';
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Search error:', err);
      },
    });
  }

  addToLibrary(game: GameSearchResult): void {
    this.addingGame = game.id;

    this.libraryService
      .addGame({
        externalGameId: game.id,
        title: game.name,
        coverImage: game.backgroundImage,
        released: game.released,
      })
      .subscribe({
      next: () => {
        this.addedGames.add(game.id);
        this.addingGame = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.addingGame = null;
        this.error = 'Error al agregar el juego. Intenta de nuevo.';
        this.cdr.detectChanges();
        console.error('Error adding game:', err);
      },
      });
  }
}
