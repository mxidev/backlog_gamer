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
}

export interface AddGameRequest {
  externalGameId: number;
  title: string;
  coverImage?: string | null;
  released?: string | null;
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
}
