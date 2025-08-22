import { inject, Injectable } from '@angular/core';
import { TodoApi } from '../api/todo-api';
import { StateFacade } from '@state';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {
  readonly todoApi = inject(TodoApi);
  readonly stateFacade = inject(StateFacade);

  readonly todoData = this.todoApi.getTodoById(this.stateFacade.user);
}
