import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LibraryGame {
  id: string;
  userId: string;
  externalGameId: number;
  title: string;
  coverImage: string | null;
  released: string | null;
  status: 'pending' | 'playing' | 'completed' | 'abandoned';
  addedAt: string;
  platform?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  personalNote?: string | null;
  rating?: number | null;
}

export interface AddGameRequest {
  externalGameId: number;
  title: string;
  coverImage?: string | null;
  released?: string | null;
}

export interface UpdatePersonalInfoRequest {
  platform?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  personalNote?: string | null;
  rating?: number | null;
}

@Injectable({ providedIn: 'root' })
export class LibraryService {
  private readonly apiUrl = 'http://localhost:3000/api/v1/library';

  constructor(private http: HttpClient) {}

  addGame(game: AddGameRequest): Observable<LibraryGame> {
    return this.http.post<LibraryGame>(`${this.apiUrl}/games`, game);
  }

  getUserLibrary(): Observable<LibraryGame[]> {
    return this.http.get<LibraryGame[]>(`${this.apiUrl}/games`);
  }

  updateGameStatus(gameId: string, status: LibraryGame['status']): Observable<LibraryGame> {
    return this.http.patch<LibraryGame>(`${this.apiUrl}/games/${gameId}/status`, { status });
  }

  updatePersonalInfo(gameId: string, info: UpdatePersonalInfoRequest): Observable<LibraryGame> {
    return this.http.patch<LibraryGame>(`${this.apiUrl}/games/${gameId}/personal-info`, info);
  }

  deleteGame(gameId: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/games/${gameId}`);
  }
}
