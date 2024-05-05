import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public form_login: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router) {
      this.form_login = new FormGroup({
        username : new FormControl('', [Validators.required]),
        password : new FormControl('', [Validators.required])
      });
    }

  login(){
    this.authService.login(this.form_login.value);
    this.router.navigate(['easyjob']);
  }
}
