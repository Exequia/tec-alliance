import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '@todo';

@Component({
  selector: 'lib-ui-todo-item',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem implements OnInit {
  private readonly fb = inject(FormBuilder);

  todo = input.required<Todo>();
  editTodo = output<Todo>();
  removeTodo = output<Todo>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(250)]],
  });

  get title() {
    return this.form?.controls['title'];
  }

  ngOnInit(): void {
    this.form?.patchValue({
      title: this.todo().title,
    });
  }

  onSubmit() {
    if (this.form?.valid) {
      this.editTodo.emit({
        ...this.todo(),
        title: this.form.value.title!,
      });
    }
  }

  initTodoDeletion() {
    this.removeTodo.emit(this.todo());
  }
}
