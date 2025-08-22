import { Injectable } from '@angular/core';
import { User } from '@users';

@Injectable({
  providedIn: 'root',
})
export class UserUtils {
  validateUserByEmail(email: string, usersData: User[] = []): User | undefined {
    return usersData?.find((user) => user.email === email);
  }
}
