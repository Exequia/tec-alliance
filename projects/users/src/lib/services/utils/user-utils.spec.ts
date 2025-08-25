import { TestBed } from '@angular/core/testing';

import { UserUtils } from './user-utils';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

describe('UserUtils', () => {
  let service: UserUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    });
    service = TestBed.inject(UserUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateUserByEmail', () => {
    it('should return undefined if usersData is empty', () => {
      const email = 'test@example.com';
      const usersData: any[] = [];
      const result = service.validateUserByEmail(email, usersData);
      expect(result).toBeUndefined();
    });

    it('should return undefined if no user with the given email is found', () => {
      const email = 'test@example.com';
      const usersData = [{ id: 1, email: 'another@example.com' }] as any[];
      const result = service.validateUserByEmail(email, usersData);
      expect(result).toBeUndefined();
    });

    it('should return the user if a user with the given email is found', () => {
      const email = 'test@example.com';
      const usersData = [
        { id: 1, email: 'test@example.com' },
        { id: 2, email: 'another@example.com' },
      ] as any[];
      const result = service.validateUserByEmail(email, usersData);
      expect(result).toEqual(usersData[0]);
    });

    it('should handle null or undefined usersData', () => {
      const email = 'test@example.com';
      let usersData: any[] | null | undefined = null;
      let result = service.validateUserByEmail(email, usersData as any);
      expect(result).toBeUndefined();

      usersData = undefined;
      result = service.validateUserByEmail(email, usersData as any);
      expect(result).toBeUndefined();
    });
  });
});
