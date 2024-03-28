import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent{

  private authService = inject(AuthService);
  private router = inject(Router);

  public user = this.authService.currentUser();

  constructor(){}

  redirectLogin(){
    this.router.navigateByUrl('/auth/login');
  }

  onLogout(){
    this.authService.logout();
  }

}
