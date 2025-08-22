import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StateFacade {
  readonly router = inject(Router);

  userEmail = signal<string | null>(null);
  userLoggedIn = computed<boolean>(() => !!this.userEmail());

  login(email: string): void {
    this.userEmail.set(email);
    this.redirectTo('/home');
  }

  logout(): void {
    this.userEmail.set(null);
    this.redirectTo('/login');
  }

  redirectTo(url: string): void {
    this.router.navigate([url]);
  }
}
