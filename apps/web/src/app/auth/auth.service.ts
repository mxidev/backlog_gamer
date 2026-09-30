import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthResponse {
  user: { id: string; email: string };
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/v1/auth';
  private readonly tokenKey = 'access_token';
  private authenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.authenticated$.value;
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap((res) => this.storeSession(res)));
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, { email, password })
      .pipe(tap((res) => this.storeSession(res)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authenticated$.next(false);
  }

  private storeSession(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.access_token);
    this.authenticated$.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}