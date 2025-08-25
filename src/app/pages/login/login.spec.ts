import { ComponentFixture, TestBed } from '@angular/core/testing';

import Login from './login';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call stateFacade.login with the email when the form is valid', () => {
    const email = 'test@example.com';
    component.form.setValue({ email });
    const loginSpy = spyOn(component.stateFacade, 'login');

    component.login();

    expect(loginSpy).toHaveBeenCalledWith(email);
  });

  it('should not call stateFacade.login when the form is invalid', () => {
    const loginSpy = spyOn(component.stateFacade, 'login');

    component.login();

    expect(loginSpy).not.toHaveBeenCalled();
  });
});
