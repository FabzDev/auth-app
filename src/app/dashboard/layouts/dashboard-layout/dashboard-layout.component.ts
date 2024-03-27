import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthStatus } from '../../../auth/interfaces/auth-status.enum';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent{

  private authService = inject(AuthService);
  private router = inject(Router);

  public user = this.authService.currentUser();

}
