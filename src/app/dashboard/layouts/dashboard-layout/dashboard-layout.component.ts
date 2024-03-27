import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent implements OnInit{

  private authService = inject(AuthService)

  public user?: User = this.authService.currentUser() || undefined;

  ngOnInit(): void {
    if(!this.user){
      this.authService.checkToken();
    }
  }

}
