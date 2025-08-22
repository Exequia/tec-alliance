import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-ui-todo-add',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-add.html',
  styleUrl: './todo-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoAdd {
  addNewTodo = output<string>();

  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(250)]],
  });

  get title() {
    return this.form.controls.title;
  }

  onSubmit() {
    if (this.form.valid) {
      this.addNewTodo.emit(this.form.value.title!);
      this.form.reset();
    }
  }
}
