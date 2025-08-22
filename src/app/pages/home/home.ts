import { Component, inject } from '@angular/core';
import { TodoFacade } from '@todo';
import { TodoAdd, TodoItem } from '@ui';

@Component({
  selector: 'app-home',
  imports: [TodoAdd, TodoItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home {
  readonly todoFacade = inject(TodoFacade);
}
