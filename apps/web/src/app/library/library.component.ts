import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryService, LibraryGame } from './library.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="library-container">
      <h1>Mi Biblioteca</h1>

      @if (loading) {
        <div class="loading">Cargando tu biblioteca...</div>
      }

      @if (error) {
        <div class="error">{{ error }}</div>
      }

      @if (!loading && !error && games.length === 0) {
        <div class="empty">
          <p>Tu biblioteca está vacía</p>
          <p class="empty-hint">Busca videojuegos y agrégalos a tu biblioteca</p>
        </div>
      }

      @if (games.length > 0) {
        <div class="games-grid">
          @for (game of games; track game.id) {
            <div class="game-card">
              @if (game.coverImage) {
                <img [src]="game.coverImage" [alt]="game.title" class="game-image" />
              } @else {
                <div class="game-image-placeholder">Sin imagen</div>
              }
              <div class="game-info">
                <h3 class="game-title">{{ game.title }}</h3>
                @if (game.released) {
                  <p class="game-year">{{ game.released | date:'yyyy' }}</p>
                }
                <div class="game-status" [class]="'status-' + game.status">
                  {{ getStatusLabel(game.status) }}
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .library-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      color: #eee;
      margin-bottom: 1.5rem;
    }

    .loading, .error, .empty {
      padding: 2rem;
      text-align: center;
      color: #aaa;
    }

    .error {
      color: #e74c3c;
    }

    .empty {
      background: #1a1a2e;
      border-radius: 8px;
      margin-top: 2rem;
    }

    .empty-hint {
      font-size: 0.875rem;
      color: #666;
      margin-top: 0.5rem;
    }

    .games-grid {
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
      margin: 0 0 0.75rem 0;
    }

    .game-status {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .status-pending {
      background: #34495e;
      color: #bdc3c7;
    }

    .status-playing {
      background: #2980b9;
      color: #ecf0f1;
    }

    .status-completed {
      background: #27ae60;
      color: #ecf0f1;
    }

    .status-abandoned {
      background: #7f8c8d;
      color: #ecf0f1;
    }

    @media (max-width: 768px) {
      .games-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
      }

      .game-image, .game-image-placeholder {
        height: 150px;
      }
    }
  `],
})
export class LibraryComponent implements OnInit {
  games: LibraryGame[] = [];
  loading = false;
  error = '';

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loadLibrary();
  }

  loadLibrary(): void {
    this.loading = true;
    this.error = '';

    this.libraryService.getUserLibrary().subscribe({
      next: (games) => {
        this.games = games;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar tu biblioteca. Intenta de nuevo.';
        this.loading = false;
        console.error('Load library error:', err);
      },
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      playing: 'Jugando',
      completed: 'Completado',
      abandoned: 'Abandonado',
    };
    return labels[status] || status;
  }
}
