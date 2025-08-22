import { Component, input } from '@angular/core';
import { Todo } from '@todo';

@Component({
  selector: 'lib-ui-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  todo = input.required<Todo>();
}
