import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { Todo } from '../../models/todo.models';
import { User } from '@users';

@Injectable({
  providedIn: 'root',
})
export class TodoApi {
  getTodoById(user: Signal<User | null>) {
    return httpResource<Todo>(() => {
      const userId = user()?.id;
      if (userId) {
        return `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;
      } else {
        return undefined;
      }
    });
  }
}
