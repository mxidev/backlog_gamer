import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryService, LibraryGame, UpdatePersonalInfoRequest } from './library.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
                <select
                  class="status-select"
                  [ngModel]="game.status"
                  (ngModelChange)="updateStatus(game, $event)"
                  [disabled]="updatingGame === game.id"
                >
                  <option value="pending">Pendiente</option>
                  <option value="playing">Jugando</option>
                  <option value="completed">Completado</option>
                  <option value="abandoned">Abandonado</option>
                </select>
                <button class="edit-btn" (click)="toggleEditForm(game)">
                  {{ editingGame === game.id ? 'Cancelar' : 'Editar info' }}
                </button>
                @if (editingGame === game.id) {
                  <div class="edit-form">
                    <input
                      type="text"
                      [(ngModel)]="editForm.platform"
                      placeholder="Plataforma (ej: PC, PS5)"
                      class="form-input"
                    />
                    <input
                      type="date"
                      [(ngModel)]="editForm.startDate"
                      placeholder="Fecha inicio"
                      class="form-input"
                    />
                    <input
                      type="date"
                      [(ngModel)]="editForm.endDate"
                      placeholder="Fecha término"
                      class="form-input"
                    />
                    <textarea
                      [(ngModel)]="editForm.personalNote"
                      placeholder="Nota personal"
                      class="form-textarea"
                      rows="3"
                    ></textarea>
                    <input
                      type="number"
                      [(ngModel)]="editForm.rating"
                      placeholder="Valoración (1-10)"
                      min="1"
                      max="10"
                      class="form-input"
                    />
                    <button class="save-btn" (click)="savePersonalInfo(game)">
                      Guardar
                    </button>
                  </div>
                }
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

    .status-select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #333;
      border-radius: 4px;
      background: #16213e;
      color: #eee;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .status-select:focus {
      outline: none;
      border-color: #0f3460;
    }

    .status-select:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .edit-btn {
      width: 100%;
      margin-top: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #0f3460;
      border-radius: 4px;
      background: transparent;
      color: #0f3460;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .edit-btn:hover {
      background: #0f3460;
      color: #eee;
    }

    .edit-form {
      margin-top: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #333;
      border-radius: 4px;
      background: #16213e;
      color: #eee;
      font-size: 0.875rem;
      font-family: inherit;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #0f3460;
    }

    .form-textarea {
      resize: vertical;
      min-height: 60px;
    }

    .save-btn {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      background: #27ae60;
      color: #eee;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .save-btn:hover {
      background: #229954;
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
  updatingGame: string | null = null;
  editingGame: string | null = null;
  editForm: UpdatePersonalInfoRequest = {
    platform: null,
    startDate: null,
    endDate: null,
    personalNote: null,
    rating: null,
  };

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

  updateStatus(game: LibraryGame, status: LibraryGame['status']): void {
    this.updatingGame = game.id;

    this.libraryService.updateGameStatus(game.id, status).subscribe({
      next: (updatedGame) => {
        const index = this.games.findIndex((g) => g.id === game.id);
        if (index !== -1) {
          this.games[index] = updatedGame;
        }
        this.updatingGame = null;
      },
      error: (err) => {
        this.error = 'Error al actualizar el estado. Intenta de nuevo.';
        this.updatingGame = null;
        console.error('Update status error:', err);
      },
    });
  }

  toggleEditForm(game: LibraryGame): void {
    if (this.editingGame === game.id) {
      this.editingGame = null;
      this.editForm = {
        platform: null,
        startDate: null,
        endDate: null,
        personalNote: null,
        rating: null,
      };
    } else {
      this.editingGame = game.id;
      this.editForm = {
        platform: game.platform || null,
        startDate: game.startDate || null,
        endDate: game.endDate || null,
        personalNote: game.personalNote || null,
        rating: game.rating || null,
      };
    }
  }

  savePersonalInfo(game: LibraryGame): void {
    this.updatingGame = game.id;

    this.libraryService.updatePersonalInfo(game.id, this.editForm).subscribe({
      next: (updatedGame) => {
        const index = this.games.findIndex((g) => g.id === game.id);
        if (index !== -1) {
          this.games[index] = updatedGame;
        }
        this.editingGame = null;
        this.updatingGame = null;
        this.editForm = {
          platform: null,
          startDate: null,
          endDate: null,
          personalNote: null,
          rating: null,
        };
      },
      error: (err) => {
        this.error = 'Error al guardar la información. Intenta de nuevo.';
        this.updatingGame = null;
        console.error('Update personal info error:', err);
      },
    });
  }
}
