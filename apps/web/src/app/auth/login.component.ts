import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  isLogin = true;
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.password = '';
    this.email = '';
    this.errorMessage = '';
  }

  submit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Completa todos los campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const operation = this.isLogin
      ? this.authService.login(this.email, this.password)
      : this.authService.register(this.email, this.password);

    operation
      .pipe(finalize(() => this.ngZone.run(() => (this.loading = false))))
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage =
            err.error?.message || 'Error al conectar con el servidor';
        },
      });
  }
}