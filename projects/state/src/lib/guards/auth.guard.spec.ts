import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { StateFacade } from '@state';
import { provideZonelessChangeDetection } from '@angular/core';

describe('authGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let stateFacadeSpy: jasmine.SpyObj<StateFacade>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl', 'createUrlTree']);
    stateFacadeSpy = jasmine.createSpyObj('StateFacade', ['userLoggedIn']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: Router, useValue: routerSpy },
        { provide: StateFacade, useValue: stateFacadeSpy },
      ],
    });

    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
  });

  it('should return true if user is logged in', () => {
    TestBed.runInInjectionContext(() => {
      stateFacadeSpy.userLoggedIn.and.returnValue(true);
      const result = authGuard(route, state);
      expect(result).toBeTrue();
    });
  });

  it('should redirect to /login if user is not logged in', () => {
    TestBed.runInInjectionContext(() => {
      stateFacadeSpy.userLoggedIn.and.returnValue(false);
      routerSpy.parseUrl.and.returnValue(routerSpy.createUrlTree(['/login']));
      const result = authGuard(route, state);
      expect(result).toEqual(routerSpy.createUrlTree(['/login']));
      expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login');
    });
  });
});
