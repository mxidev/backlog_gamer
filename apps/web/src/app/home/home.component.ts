import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>Backlog Gamer</h1>
      <p>Bienvenido a tu biblioteca de videojuegos</p>
      <div class="actions">
        <button (click)="goToSearch()" class="btn-primary">Buscar videojuegos</button>
        <button (click)="goToLibrary()" class="btn-primary">Ver mi biblioteca</button>
        <button (click)="logout()" class="btn-secondary">Cerrar sesión</button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 600px;
      margin: 4rem auto;
      padding: 2rem;
      text-align: center;
      color: #eee;

      h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      p {
        color: #aaa;
        margin-bottom: 2rem;
      }

      .actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.2s;
      }

      .btn-primary {
        background: #0f3460;
        color: #eee;

        &:hover {
          background: #1a4a8a;
        }
      }

      .btn-secondary {
        background: #e74c3c;
        color: #eee;

        &:hover {
          background: #c0392b;
        }
      }
    }
  `],
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  goToLibrary(): void {
    this.router.navigate(['/library']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
