import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserFacade } from '@users';

@Injectable({
  providedIn: 'root',
})
export class StateFacade {
  readonly router = inject(Router);
  readonly userFacade = inject(UserFacade);

  user = signal<User | null>(null);
  userLoggedIn = computed<boolean>(() => !!this.user());
  toastMessage = signal<string | null>(null);

  login(email: string): void {
    const user = this.userFacade.validateUserByEmail(email);
    if (!user) {
      this.setToastMessage('The email is not valid.');
    } else {
      this.user.set(user);
      this.redirectTo('/home');
    }
  }

  setToastMessage(message: string): void {
    this.toastMessage.set(message);
  }

  deleteToastMessage(): void {
    this.toastMessage.set(null);
  }

  logout(): void {
    this.user.set(null);
    this.redirectTo('/login');
  }

  redirectTo(url: string): void {
    this.router.navigate([url]);
  }
}
