import { computed, inject, Injectable, signal } from '@angular/core';
import { TodoApi } from '../api/todo-api';
import { StateFacade } from '@state';
import { Todo } from '@todo';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {
  readonly todoApi = inject(TodoApi);
  readonly stateFacade = inject(StateFacade);

  newTodoTitle = signal<string | undefined>(undefined);
  readonly newTodo = this.todoApi.addTodo(this.newTodoTitle, this.stateFacade.user()?.id!);
  readonly todoData = this.todoApi.getTodoById(this.stateFacade.user, this.newTodo?.status);

  addTodo(todoTitle: string) {
    this.newTodoTitle.set(todoTitle);
  }
}
