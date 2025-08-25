import { TestBed } from '@angular/core/testing';

import { TodoFacade } from './todo-facade';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { Todo } from '@todo';

describe('TodoFacade', () => {
  let service: TodoFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    });
    service = TestBed.inject(TodoFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set newTodoTitle when addTodo is called', () => {
    const todoTitle = 'Test Todo';
    service.addTodo(todoTitle);
    expect(service.newTodoTitle()).toBe(todoTitle);
  });

  it('should set updatedTodo when editTodo is called', () => {
    const todo: Todo = { id: 1, title: 'Test Todo', completed: false, userId: 1 };
    service.editTodo(todo);
    expect(service.updatedTodo()).toBe(todo);
  });

  it('should set removedTodo when removeTodo is called', () => {
    const todo: Todo = { id: 1, title: 'Test Todo', completed: false, userId: 1 };
    service.removeTodo(todo);
    expect(service.removedTodo()).toBe(todo);
  });
});
