import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public registerForm: FormGroup = this.fb.group({
    email: ['aurora@gmail.com', [Validators.required, Validators.email]],
    name: ['Aurora E', [Validators.required]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  onRegister(): void {
    this.authService.register(this.registerForm.value).subscribe();
  }
}
