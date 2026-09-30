import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'search',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./catalog/search.component').then((m) => m.SearchComponent),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
