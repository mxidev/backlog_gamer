import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GameSearchResult {
  id: number;
  name: string;
  backgroundImage: string | null;
  released: string | null;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly apiUrl = 'http://localhost:3000/api/v1/catalog';

  constructor(private http: HttpClient) {}

  searchGames(query: string): Observable<GameSearchResult[]> {
    return this.http.get<GameSearchResult[]>(`${this.apiUrl}/search`, {
      params: { q: query },
    });
  }
}
