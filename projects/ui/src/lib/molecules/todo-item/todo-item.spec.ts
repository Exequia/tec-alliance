import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItem } from './todo-item';
import { ComponentRef, provideZonelessChangeDetection } from '@angular/core';
import { Todo } from '@todo';

describe('TodoItem', () => {
  let component: TodoItem;
  let fixture: ComponentFixture<TodoItem>;
  let componentRef: ComponentRef<TodoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItem],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItem);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('todo', { userId: 1, id: 1, title: 'Test Todo', completed: false });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the todo title on ngOnInit', () => {
    const todo: Todo = { userId: 1, id: 1, title: 'Test Todo', completed: false };
    componentRef.setInput('todo', todo);
    component.ngOnInit();
    expect(component.form.value.title).toBe('Test Todo');
  });

  it('should emit editTodo event with updated title when form is valid on onSubmit', () => {
    const todo: Todo = { userId: 1, id: 1, title: 'Original Title', completed: false };
    componentRef.setInput('todo', todo);

    component.ngOnInit();
    const newTitle = 'Updated Title';
    component.form.controls['title'].setValue(newTitle);
    let emittedTodo: Todo | undefined;
    component.editTodo.subscribe((todo) => (emittedTodo = todo));

    component.onSubmit();

    expect(emittedTodo).toEqual({ ...todo, title: newTitle });
  });

  it('should not emit editTodo event when form is invalid on onSubmit', () => {
    component.form.controls['title'].setValue('');
    let emitted = false;
    component.editTodo.subscribe(() => (emitted = true));

    component.onSubmit();

    expect(emitted).toBe(false);
  });

  it('should emit removeTodo event with the todo on initTodoDeletion', () => {
    const todo: Todo = { userId: 1, id: 1, title: 'Test Todo', completed: false };
    componentRef.setInput('todo', todo);
    let emittedTodo: Todo | undefined;
    component.removeTodo.subscribe((todo) => (emittedTodo = todo));

    component.initTodoDeletion();

    expect(emittedTodo).toEqual(todo);
  });
});
