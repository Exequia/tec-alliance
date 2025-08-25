import { httpResource } from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { User } from '@users';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  injector = inject(Injector);

  getUsers() {
    return httpResource<User[]>(() => 'https://jsonplaceholder.typicode.com/users', {
      injector: this.injector,
    });
  }
}
