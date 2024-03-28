import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces/index.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  private readonly myUrl = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);


  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed( () => this._currentUser());
  public authStatus = computed( () => this._authStatus());

  constructor(){
    this.checkToken().subscribe()
  };

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

  checkToken(): Observable<boolean>{
    const url = 'http://localhost:3000/auth/check-token';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, { headers:headers })
      .pipe(
        map(({ user, jwt: token2 }) => {

          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token2);
          console.log('true papa');

          return true;
         } ),
        catchError( () => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          console.log('Check Token: Error getting token');
          console.log('false papa');
          return of(false);

      }))
  }

  logout(){
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}
