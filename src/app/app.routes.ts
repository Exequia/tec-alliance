import { Routes } from '@angular/router';
import { authGuard } from '@state';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home'),
    canActivate: [authGuard],
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about'),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login'),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
