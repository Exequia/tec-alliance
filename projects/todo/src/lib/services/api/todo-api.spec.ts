import { TestBed } from '@angular/core/testing';

import { TodoApi } from './todo-api';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('TodoApi', () => {
  let service: TodoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    });
    service = TestBed.inject(TodoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
