import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar, Toast } from '@ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('tec-alliance');
}
