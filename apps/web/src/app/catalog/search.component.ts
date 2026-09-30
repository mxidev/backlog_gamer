import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService, GameSearchResult } from './catalog.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <h1>Buscar videojuegos</h1>

      <div class="search-box">
        <input
          type="text"
          [(ngModel)]="searchQuery"
          (input)="onSearch()"
          placeholder="Buscar por nombre..."
          class="search-input"
        />
      </div>

      @if (loading) {
        <div class="loading">Buscando...</div>
      }

      @if (error) {
        <div class="error">{{ error }}</div>
      }

      @if (!loading && !error && results.length === 0 && searchQuery.trim()) {
        <div class="empty">No se encontraron resultados para "{{ searchQuery }}"</div>
      }

      @if (results.length > 0) {
        <div class="results">
          @for (game of results; track game.id) {
            <div class="game-card">
              @if (game.backgroundImage) {
                <img [src]="game.backgroundImage" [alt]="game.name" class="game-image" />
              } @else {
                <div class="game-image-placeholder">Sin imagen</div>
              }
              <div class="game-info">
                <h3 class="game-title">{{ game.name }}</h3>
                @if (game.released) {
                  <p class="game-year">{{ game.released | date:'yyyy' }}</p>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      color: #eee;
      margin-bottom: 1.5rem;
    }

    .search-box {
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
      border: 1px solid #333;
      border-radius: 4px;
      background: #16213e;
      color: #eee;
    }

    .search-input:focus {
      outline: none;
      border-color: #0f3460;
    }

    .loading, .error, .empty {
      padding: 1rem;
      text-align: center;
      color: #aaa;
    }

    .error {
      color: #e74c3c;
    }

    .results {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .game-card {
      background: #1a1a2e;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.2s;
    }

    .game-card:hover {
      transform: translateY(-4px);
    }

    .game-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .game-image-placeholder {
      width: 100%;
      height: 200px;
      background: #16213e;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
    }

    .game-info {
      padding: 1rem;
    }

    .game-title {
      color: #eee;
      font-size: 1rem;
      margin: 0 0 0.5rem 0;
    }

    .game-year {
      color: #aaa;
      font-size: 0.875rem;
      margin: 0;
    }
  `],
})
export class SearchComponent {
  searchQuery = '';
  results: GameSearchResult[] = [];
  loading = false;
  error = '';
  private searchTimeout: any;

  constructor(private catalogService: CatalogService) {}

  onSearch(): void {
    clearTimeout(this.searchTimeout);

    if (!this.searchQuery.trim()) {
      this.results = [];
      this.error = '';
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
      },
      error: (err) => {
        this.error = 'Error al buscar videojuegos. Intenta de nuevo.';
        this.loading = false;
        console.error('Search error:', err);
      },
    });
  }
}
