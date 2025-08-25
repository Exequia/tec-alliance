import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { responseInterceptor } from './generic-api';
import { StateFacade } from '@state';
import { TimeoutError, of, throwError } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('responseInterceptor', () => {
  let stateFacadeSpy: jasmine.SpyObj<StateFacade>;
  let next: jasmine.Spy;
  let req: HttpRequest<unknown>;

  beforeEach(() => {
    stateFacadeSpy = jasmine.createSpyObj('StateFacade', ['setToastMessage']);
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: StateFacade, useValue: stateFacadeSpy },
      ],
    });
    req = new HttpRequest('GET', '/test');
    next = jasmine.createSpy('next');
  });

  it('should pass through successful responses', (done) => {
    TestBed.runInInjectionContext(() => {
      const event: HttpEvent<unknown> = { type: 0 } as HttpEvent<unknown>;
      next.and.returnValue(of(event));
      responseInterceptor(req, next).subscribe((result) => {
        expect(result).toBe(event);
        done();
      });
    });
  });

  it('should handle TimeoutError', (done) => {
    TestBed.runInInjectionContext(() => {
      next.and.returnValue(throwError(() => new TimeoutError()));
      responseInterceptor(req, next).subscribe({
        error: (err) => {
          expect(err instanceof TimeoutError).toBeTrue();
          expect(stateFacadeSpy.setToastMessage).toHaveBeenCalledWith('Request timed out');
          done();
        },
      });
    });
  });

  it('should handle 401 Unauthorized', (done) => {
    TestBed.runInInjectionContext(() => {
      const error = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
      next.and.returnValue(throwError(() => error));
      responseInterceptor(req, next).subscribe({
        error: (err) => {
          expect(err.status).toBe(401);
          expect(stateFacadeSpy.setToastMessage).toHaveBeenCalledWith('Unauthorized access');
          done();
        },
      });
    });
  });

  it('should handle 403 Forbidden', (done) => {
    TestBed.runInInjectionContext(() => {
      const error = new HttpErrorResponse({ status: 403, statusText: 'Forbidden' });
      next.and.returnValue(throwError(() => error));
      responseInterceptor(req, next).subscribe({
        error: (err) => {
          expect(err.status).toBe(403);
          expect(stateFacadeSpy.setToastMessage).toHaveBeenCalledWith('Access forbidden');
          done();
        },
      });
    });
  });

  it('should handle 404 Not Found', (done) => {
    TestBed.runInInjectionContext(() => {
      const error = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
      next.and.returnValue(throwError(() => error));
      responseInterceptor(req, next).subscribe({
        error: (err) => {
          expect(err.status).toBe(404);
          expect(stateFacadeSpy.setToastMessage).toHaveBeenCalledWith('Resource not found');
          done();
        },
      });
    });
  });

  it('should handle 500 Internal Server Error', (done) => {
    TestBed.runInInjectionContext(() => {
      const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' });
      next.and.returnValue(throwError(() => error));
      responseInterceptor(req, next).subscribe({
        error: (err) => {
          expect(err.status).toBe(500);
          expect(stateFacadeSpy.setToastMessage).toHaveBeenCalledWith('Internal server error');
          done();
        },
      });
    });
  });

  it('should handle unknown HttpErrorResponse', (done) => {
    TestBed.runInInjectionContext(() => {
      const error = new HttpErrorResponse({ status: 418, statusText: "I'm a teapot" });
      next.and.returnValue(throwError(() => error));
      responseInterceptor(req, next).subscribe({
        error: (err) => {
          expect(err.status).toBe(418);
          expect(stateFacadeSpy.setToastMessage).toHaveBeenCalledWith(
            'An unexpected error occurred'
          );
          done();
        },
      });
    });
  });

  it('should handle unknown errors', (done) => {
    TestBed.runInInjectionContext(() => {
      const error = new Error('Unknown');
      next.and.returnValue(throwError(() => error));
      responseInterceptor(req, next).subscribe({
        error: (err) => {
          expect(err).toBe(error);
          expect(stateFacadeSpy.setToastMessage).toHaveBeenCalledWith(
            'An unexpected error occurred'
          );
          done();
        },
      });
    });
  });
});
