import { httpResource } from '@angular/common/http';
import { Injectable, ResourceStatus, Signal } from '@angular/core';
import { Todo } from '../../models/todo.models';
import { User } from '@users';

@Injectable({
  providedIn: 'root',
})
export class TodoApi {
  getTodoById(
    user: Signal<User | null>,
    newTodoStatus?: Signal<ResourceStatus>,
    updatedTodoStatus?: Signal<ResourceStatus>,
    deleteTodoStatus?: Signal<ResourceStatus>
  ) {
    return httpResource<Todo>(() => {
      const userId = user()?.id;
      if (
        userId &&
        (newTodoStatus?.() === 'idle' || newTodoStatus?.() === 'resolved') &&
        (updatedTodoStatus?.() === 'idle' || updatedTodoStatus?.() === 'resolved') &&
        (deleteTodoStatus?.() === 'idle' || deleteTodoStatus?.() === 'resolved')
      ) {
        return `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;
      } else {
        return undefined;
      }
    });
  }

  addTodo(newTodoTitle: Signal<string | undefined>, userId: number) {
    return httpResource<Todo>(() => {
      if (newTodoTitle() && userId) {
        return {
          method: 'POST',
          url: 'https://jsonplaceholder.typicode.com/todos',
          body: { title: newTodoTitle(), userId },
        };
      } else {
        return undefined;
      }
    });
  }

  updateTodo(todo: Signal<Todo | undefined>) {
    return httpResource<Todo>(() => {
      if (!!todo()) {
        return {
          method: 'PUT',
          url: `https://jsonplaceholder.typicode.com/todos/${todo()!.id}`,
          body: { todo: todo() },
        };
      } else {
        return undefined;
      }
    });
  }

  deleteTodo(todo: Signal<Todo | undefined>) {
    return httpResource<Todo>(() => {
      if (!!todo()) {
        return {
          method: 'DELETE',
          url: `https://jsonplaceholder.typicode.com/todos/${todo()!.id}`,
        };
      } else {
        return undefined;
      }
    });
  }
}
