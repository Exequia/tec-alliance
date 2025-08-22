import { Component, inject } from '@angular/core';
import { TodoFacade } from '@todo';
import { TodoItem } from '@ui';

@Component({
  selector: 'app-home',
  imports: [TodoItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home {
  readonly todoFacade = inject(TodoFacade);
}
