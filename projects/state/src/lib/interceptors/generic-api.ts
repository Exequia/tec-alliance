import { HttpEvent, HttpHandlerFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { StateFacade } from '@state';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

export function responseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const stateFacade = inject(StateFacade);

  return next(req).pipe(
    timeout(3000),
    catchError((error: unknown) => {
      if (error instanceof TimeoutError) {
        stateFacade.setToastMessage('Request timed out');
        return throwError(() => error);
      }

      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            stateFacade.setToastMessage('Unauthorized access');
            return throwError(() => error);
          case 403:
            stateFacade.setToastMessage('Access forbidden');
            return throwError(() => error);
          case 404:
            stateFacade.setToastMessage('Resource not found');
            return throwError(() => error);
          case 500:
            stateFacade.setToastMessage('Internal server error');
            return throwError(() => error);
          default:
            stateFacade.setToastMessage('An unexpected error occurred');
            return throwError(() => error);
        }
      }

      stateFacade.setToastMessage('An unexpected error occurred');
      return throwError(() => error);
    })
  );
}
