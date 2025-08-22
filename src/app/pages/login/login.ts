import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateFacade } from '@state';

@Component({
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export default class LoginComponent {
  readonly fb = inject(FormBuilder);
  readonly stateFacade = inject(StateFacade);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  login(): void {
    if (this.form.valid) {
      this.stateFacade.login(this.form.value.email!);
    }
  }
}
