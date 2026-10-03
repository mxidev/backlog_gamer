import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LibraryGame, LibraryService, UpdatePersonalInfoRequest } from './library.service';

@Component({
  selector: 'app-library',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './library.html',
  styleUrl: './library.scss',
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

  searchQuery = '';
  filterStatus = '';
  sortBy = '';
  sortOrder = 'asc';
  private searchTimeout: ReturnType<typeof setTimeout> | undefined;

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

  confirmDelete(game: LibraryGame): void {
    const confirmed = confirm(
      `¿Estás seguro de que quieres eliminar "${game.title}" de tu biblioteca?`,
    );
    if (confirmed) {
      this.deleteGame(game);
    }
  }

  deleteGame(game: LibraryGame): void {
    this.updatingGame = game.id;

    this.libraryService.deleteGame(game.id).subscribe({
      next: () => {
        this.games = this.games.filter((g) => g.id !== game.id);
        this.updatingGame = null;
      },
      error: (err) => {
        this.error = 'Error al eliminar el juego. Intenta de nuevo.';
        this.updatingGame = null;
        console.error('Delete game error:', err);
      },
    });
  }

  onSearch(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.applyFilters();
    }, 300);
  }

  applyFilters(): void {
    this.loading = true;
    this.error = '';

    const params: { q?: string; status?: string; sortBy?: string; sortOrder?: string } = {};
    if (this.searchQuery.trim()) {
      params.q = this.searchQuery.trim();
    }
    if (this.filterStatus) {
      params.status = this.filterStatus;
    }
    if (this.sortBy) {
      params.sortBy = this.sortBy;
      params.sortOrder = this.sortOrder;
    }

    this.libraryService.searchLibrary(params).subscribe({
      next: (games) => {
        this.games = games;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al buscar juegos. Intenta de nuevo.';
        this.loading = false;
        console.error('Search library error:', err);
      },
    });
  }

  clearFilters(): void {
    clearTimeout(this.searchTimeout);
    this.searchQuery = '';
    this.filterStatus = '';
    this.sortBy = '';
    this.sortOrder = 'asc';
    this.loadLibrary();
  }
}
