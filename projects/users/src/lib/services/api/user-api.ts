import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@users';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  getUsers() {
    return httpResource<User[]>(() => 'https://jsonplaceholder.typicode.com/users');
  }
}
