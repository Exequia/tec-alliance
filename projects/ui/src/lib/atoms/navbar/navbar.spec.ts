import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { provideHttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { StateFacade } from '@state';

class MockStateFacade {
  userLoggedIn() {
    return true;
  }
}

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    const routes = [
      { path: 'login', component: Navbar },
      { path: 'home', component: Navbar },
      { path: 'about', component: Navbar },
    ];

    await TestBed.configureTestingModule({
      imports: [Navbar, RouterTestingModule.withRoutes(routes)],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: {} },
        { provide: StateFacade, useClass: MockStateFacade },
        { provide: Location, useClass: Location },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login when "Login" link is clicked', async () => {
    const loginLink = fixture.debugElement.query(By.css('[data-testid="login-link"]'));

    loginLink.nativeElement.click();

    await fixture.whenStable();
    expect(location.path()).toBe('/login');
  });

  it('should navigate to home when "Home" link is clicked and user is logged in', async () => {
    const stateFacade = TestBed.inject(StateFacade);
    spyOn(stateFacade, 'userLoggedIn').and.returnValue(true);
    fixture.detectChanges();

    const homeLink = fixture.debugElement.query(By.css('[data-testid="home-link"]'));
    expect(homeLink).not.toBeNull();

    expect(homeLink.nativeElement.style.pointerEvents).toBe('auto');
    expect(homeLink.nativeElement.style.opacity).toBe('1');

    homeLink.nativeElement.click();

    await fixture.whenStable();
    expect(location.path()).toBe('/home');
  });

  it('should navigate to login when "About" link is clicked', async () => {
    const aboutLink = fixture.debugElement.query(By.css('[data-testid="about-link"]'));

    aboutLink.nativeElement.click();

    await fixture.whenStable();
    expect(location.path()).toBe('/about');
  });
});
