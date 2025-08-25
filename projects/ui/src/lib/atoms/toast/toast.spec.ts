import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toast } from './toast';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('Toast', () => {
  beforeAll(() => {
    (globalThis as any).bootstrap = {
      Toast: class {
        show() {}
        hide() {}
        constructor() {}
      },
    };
  });

  let component: Toast;
  let fixture: ComponentFixture<Toast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toast],
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Toast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showToast when toastMessage is truthy', () => {
    const showToastSpy = spyOn(component, 'showToast');
    component.state.toastMessage.set('Test message');
    fixture.detectChanges();
    expect(showToastSpy).toHaveBeenCalled();
  });

  it('should not call showToast when toastMessage is falsy', () => {
    const showToastSpy = spyOn(component, 'showToast');
    component.state.toastMessage.set('');
    fixture.detectChanges();
    expect(showToastSpy).not.toHaveBeenCalled();
  });

  it('should call deleteToastMessage when toast is hidden', () => {
    const deleteToastMessageSpy = spyOn(component.state, 'deleteToastMessage');
    const event = new Event('hidden.bs.toast');
    component.toast().nativeElement.dispatchEvent(event);
    expect(deleteToastMessageSpy).toHaveBeenCalled();
  });

  it('should call show on toastInstance when showToast is called', () => {
    const showSpy = spyOn(component.toastInstance, 'show');
    component.showToast();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should call hide on toastInstance when hideToast is called', () => {
    const hideSpy = spyOn(component.toastInstance, 'hide');
    component.hideToast();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('should initialize toastInstance in ngAfterViewInit', () => {
    expect(component.toastInstance).toBeDefined();
  });
});
