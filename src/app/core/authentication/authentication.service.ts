import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

export interface Credentials {
  // Customize received credentials here
  firstname: string;
  lastname: string;
  email: string;
  picture: string;
  scope: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}
export interface CreateAccountContext {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  agreeCGU?: boolean;
}
export interface ForgotPasswordContext {
  email: string;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;
  redirectUrl: string;

  constructor(private httpClient: HttpClient) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.httpClient.post<Credentials>('login', { email: context.username, password: context.password })
      .pipe(
        map(data => {
          this.setCredentials(data, context.remember);
          return data;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  createAccount(context: CreateAccountContext): Observable<any> {
    return this.httpClient.post<any>('create-account', {
      email: context.email,
      password: context.password,
      firstname: context.firstname,
      lastname: context.lastname
    })
      .pipe(
        map(data => {
          // this.setCredentials(data, context.remember);
          return data;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  forgotPassord(context: ForgotPasswordContext): Observable<any> {
    return this.httpClient.post<any>('forgot-password', {
      email: context.email
    })
      .pipe(
        map(data => {
          return data;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

}
