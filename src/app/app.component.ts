import { Component, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces/auth-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authApp';

  private authService = inject(AuthService);
  private router = inject(Router);


  public statusEffect = effect( () => {
    console.log(this.authService.authStatus());

    if( this.authService.authStatus() === AuthStatus.notAuthenticated ){
      this.router.navigateByUrl('/auth/login');
      return;
    }

    if( this.authService.authStatus() === AuthStatus.authenticated ){
      this.router.navigateByUrl('/dashboard');
      return;
    }

    if( this.authService.authStatus() === AuthStatus.checking ){
      this.authService.checkToken().subscribe();
      this.router.navigateByUrl('dashboard');
    }
  })
}
