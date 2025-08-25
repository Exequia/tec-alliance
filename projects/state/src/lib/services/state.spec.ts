import { TestBed } from '@angular/core/testing';

import { StateFacade } from './state';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { User } from '@users';

describe('StateFacade', () => {
  let service: StateFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    });
    service = TestBed.inject(StateFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize user as null', () => {
    expect(service.user()).toBeNull();
  });

  it('should initialize toastMessage as null', () => {
    expect(service.toastMessage()).toBeNull();
  });

  describe('login', () => {
    it('should set toast message if user is not valid', () => {
      const email = 'test@test.com';
      const setToastMessageSpy = spyOn(service, 'setToastMessage');
      spyOn(service.userFacade, 'validateUserByEmail').and.returnValue(undefined);

      service.login(email);

      expect(setToastMessageSpy).toHaveBeenCalledWith('The email is not valid.');
    });

    it('should set user and redirect to /home if user is valid', () => {
      const email = 'test@test.com';
      const user: User = {
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
        username: 'testuser',
        address: {
          street: 'Test Street',
          suite: 'Suite 1',
          city: 'Test City',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: { name: 'Test Company', catchPhrase: 'Test Catchphrase', bs: 'Test BS' },
      };
      spyOn(service.userFacade, 'validateUserByEmail').and.returnValue(user);
      const redirectToSpy = spyOn(service, 'redirectTo');

      service.login(email);

      expect(service.user()).toEqual(user);
      expect(redirectToSpy).toHaveBeenCalledWith('/home');
    });
  });

  describe('setToastMessage', () => {
    it('should set the toast message', () => {
      const message = 'Test message';
      service.setToastMessage(message);
      expect(service.toastMessage()).toBe(message);
    });
  });

  describe('deleteToastMessage', () => {
    it('should set the toast message to null', () => {
      service.setToastMessage('Test message');
      service.deleteToastMessage();
      expect(service.toastMessage()).toBeNull();
    });
  });

  describe('logout', () => {
    it('should set user to null and redirect to /login', () => {
      const redirectToSpy = spyOn(service, 'redirectTo');
      service.user.set({
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
        username: 'testuser',
        address: {
          street: 'Test Street',
          suite: 'Suite 1',
          city: 'Test City',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: { name: 'Test Company', catchPhrase: 'Test Catchphrase', bs: 'Test BS' },
      });

      service.logout();

      expect(service.user()).toBeNull();
      expect(redirectToSpy).toHaveBeenCalledWith('/login');
    });
  });

  describe('redirectTo', () => {
    it('should navigate to the specified url', () => {
      const routerSpy = spyOn(service.router, 'navigate');
      const url = '/test';

      service.redirectTo(url);

      expect(routerSpy).toHaveBeenCalledWith([url]);
    });
  });

  describe('userLoggedIn', () => {
    it('should return true if user is logged in', () => {
      service.user.set({
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
        username: 'testuser',
        address: {
          street: 'Test Street',
          suite: 'Suite 1',
          city: 'Test City',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: { name: 'Test Company', catchPhrase: 'Test Catchphrase', bs: 'Test BS' },
      });
      expect(service.userLoggedIn()).toBe(true);
    });

    it('should return false if user is not logged in', () => {
      service.user.set(null);
      expect(service.userLoggedIn()).toBe(false);
    });
  });
});
