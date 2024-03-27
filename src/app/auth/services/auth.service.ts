import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces/index.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly myUrl = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed( () => this._currentUser());
  public authStatus = computed( () => this._authStatus());

  constructor() {}

  login( email: string, password: string): Observable<boolean> {
    const url = `${this.myUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      tap( ({ user, jwt: token }) => {
        this._currentUser.set( user );
        this._authStatus.set( AuthStatus.authenticated )
        localStorage.setItem( 'token', token );

        // console.log({user, token});
      }),

      map(() => true),

      catchError( err => {
        return throwError( () => err.error.message );
      })
    );
  }

  checkToken(){
    const url = 'http://localhost:3000/auth/check-token';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    this.http.get<CheckTokenResponse>(url, { headers:headers })
      .pipe(
        map(({ user, jwt: token }) => {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token)
         } ),
        catchError( () => {
        console.log('Check Token: Error getting token');
        return of(false)
      }))
  }

}
