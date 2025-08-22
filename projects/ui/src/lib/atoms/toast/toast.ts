import { AfterViewInit, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { StateFacade } from '@state';

declare var bootstrap: any;

@Component({
  selector: 'lib-ui-toast',
  standalone: true,
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast implements AfterViewInit {
  readonly state = inject(StateFacade);

  toast = viewChild.required<ElementRef<HTMLDivElement>>('liveToast');

  private toastInstance: any;

  constructor() {
    effect(() => {
      if (this.state.toastMessage()) {
        this.showToast();
      }
    });
  }

  ngAfterViewInit() {
    this.toastInstance = new bootstrap.Toast(this.toast().nativeElement);
    this.toast().nativeElement.addEventListener('hidden.bs.toast', () => {
      this.state.deleteToastMessage();
    });
  }

  showToast() {
    this.toastInstance.show();
  }

  hideToast() {
    this.toastInstance.hide();
  }
}
