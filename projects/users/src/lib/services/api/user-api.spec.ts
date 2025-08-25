import { TestBed } from '@angular/core/testing';
import { UserApi } from './user-api';
import { ApplicationRef, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { User } from '@users';

describe('UserApi', () => {
  let service: UserApi;
  let mockBackend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UserApi);

    mockBackend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from the API', async () => {
    const response = service.getUsers();
    TestBed.tick();
    const firstRequest = mockBackend.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(firstRequest.request.method).toBe('GET');

    const mockUsers: User[] = [
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
    firstRequest.flush(mockUsers);

    TestBed.tick();
    await TestBed.inject(ApplicationRef).whenStable();

    expect(response.value()).toEqual(mockUsers);

    mockBackend.verify();
  });
});
