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
  updatedTodo = signal<Todo | undefined>(undefined);
  readonly updateTodo = this.todoApi.updateTodo(this.updatedTodo);
  removedTodo = signal<Todo | undefined>(undefined);
  readonly deleteTodo = this.todoApi.deleteTodo(this.removedTodo);
  readonly todoData = this.todoApi.getTodoById(
    this.stateFacade.user,
    this.newTodo?.status,
    this.updateTodo?.status,
    this.deleteTodo?.status
  );

  addTodo(todoTitle: string) {
    this.newTodoTitle.set(todoTitle);
  }

  editTodo(todo: Todo) {
    this.updatedTodo.set(todo);
  }

  removeTodo(todo: Todo) {
    this.removedTodo.set(todo);
  }
}
