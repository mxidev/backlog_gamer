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
      <button (click)="logout()">Cerrar sesión</button>
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

      button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        background: #e74c3c;
        color: #eee;
        font-size: 1rem;
        cursor: pointer;

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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
