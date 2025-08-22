import { inject, Injectable } from '@angular/core';
import { UserApi } from '../api/user-api';
import { HttpResourceRef } from '@angular/common/http';
import { User, UserUtils } from '@users';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  readonly usersUtils = inject(UserUtils);
  readonly usersApi = inject(UserApi);

  usersData: HttpResourceRef<User[] | undefined> = this.usersApi.getUsers();

  validateUserByEmail(email: string): User | undefined {
    return this.usersUtils.validateUserByEmail(email, this.usersData?.value() || []);
  }
}
