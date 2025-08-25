import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAdd } from './todo-add';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TodoAdd', () => {
  let component: TodoAdd;
  let fixture: ComponentFixture<TodoAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoAdd],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should emit a new todo event with the title value when the form is valid', () => {
      const titleValue = 'Test Todo';
      component.form.controls.title.setValue(titleValue);
      spyOn(component.addNewTodo, 'emit');

      component.onSubmit();

      expect(component.addNewTodo.emit).toHaveBeenCalledWith(titleValue);
    });

    it('should reset the form after submitting a valid form', () => {
      component.form.controls.title.setValue('Test Todo');
      spyOn(component.form, 'reset');

      component.onSubmit();

      expect(component.form.reset).toHaveBeenCalled();
    });

    it('should not emit a new todo event when the form is invalid', () => {
      spyOn(component.addNewTodo, 'emit');

      component.onSubmit();

      expect(component.addNewTodo.emit).not.toHaveBeenCalled();
    });
  });
});
