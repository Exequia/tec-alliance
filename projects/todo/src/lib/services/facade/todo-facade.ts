import { inject, Injectable } from '@angular/core';
import { TodoApi } from '../api/todo-api';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {
  readonly todoApi = inject(TodoApi);
}
