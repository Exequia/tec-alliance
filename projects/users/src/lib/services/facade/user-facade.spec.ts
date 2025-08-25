import { TestBed } from '@angular/core/testing';

import { UserFacade } from './user-facade';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { UserUtils } from '@users';

describe('UserFacade', () => {
  let service: UserFacade;
  let usersUtils: UserUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    });
    service = TestBed.inject(UserFacade);
    usersUtils = TestBed.inject(UserUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateUserByEmail', () => {
    it('should return user if email is found', () => {
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          username: 'johndoe',
          email: 'john.doe@example.com',
          address: {
            street: 'Street',
            suite: 'Suite',
            city: 'City',
            zipcode: 'Zipcode',
            geo: { lat: '0', lng: '0' },
          },
          phone: '1234567890',
          website: 'example.com',
          company: {
            name: 'Company',
            catchPhrase: 'Catch Phrase',
            bs: 'bs',
          },
        },
      ];
      spyOn(usersUtils, 'validateUserByEmail').and.returnValue(mockUsers[0]);
      const result = service.validateUserByEmail(mockUsers[0].email);
      expect(result).toEqual(mockUsers[0]);
    });

    it('should return user if email is different', () => {
      spyOn(usersUtils, 'validateUserByEmail').and.returnValue(undefined);
      const result = service.validateUserByEmail('test@example.com');
      expect(result).toBeUndefined();
    });
  });
});
