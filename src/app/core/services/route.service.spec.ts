import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from '../authentication/authentication.service';
import { ShellComponent } from '../shell/shell.component';
import { Route } from './route.service';
import { ProtectedGuard } from 'ngx-auth';
import { MockAuthenticationService } from './authentication.service.mock';

describe('Route', () => {
  let route: Route;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProtectedGuard ,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        Route
      ]
    });
  });

  beforeEach(inject([Route], (_route: Route) => {
    route = _route;
  }));

  describe('withShell', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Route.withShell(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(ShellComponent);
    });
  });
});
