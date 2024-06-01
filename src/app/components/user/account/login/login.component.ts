import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../../service/user/account.service';

import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    AccountService,
    AuthService
  ]
})
export class LoginComponent {

  public form_login: FormGroup;
  public eyeShowPassword:any = false;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router) {
      this.form_login = this.fb.group({
        username : [null, [Validators.required]],
        password : [null, [Validators.required]]
      });
    }

  public login(){
    const username = this.form_login.value.username;
    const password = this.form_login.value.password;
    this.accountService.findAccountByUsername(username,password).subscribe((resp) => {
      
      if(resp.status === 500){
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "warning",
          title: resp.message
        });
        return ;
      }
      
      if(resp.status === 200){
        const auth = {
          username: resp.result.username,
          password: resp.result.password
        };
        this.authService.createToken(auth).subscribe((resp => {
          localStorage.setItem(auth.username+"_jwtToken", resp.token);
        }));

        const account = {
          id: resp.result.id + '_' +resp.result.username,
          username: resp.result.username,
          create_date: resp.result.create_date,
          is_del: resp.result.is_del,
          full_name: resp.result.full_name,
          roles: resp.role
        };
        this.authService.login(account);
        
        const stageUrl = localStorage.getItem('stageUrl');
        if (resp.role.length > 0) {
          if(resp.role == 1) {
            if(stageUrl != null)
                this.router.navigate([stageUrl]);
            else
              this.router.navigate(['dashboard-admin/dashboard']);
          } else if (resp.role == 2) {
            if(stageUrl != null)
                this.router.navigate([stageUrl]);
            else
              this.router.navigate(['easyjob']);
          } else if(resp.role == 3) {
            if(stageUrl != null)
                this.router.navigate([stageUrl]);
            else
              this.router.navigate(['dashboard-recruiter/dashboard']);
          } 
        }
      }
    });
  }

  public showPassword() {
    this.eyeShowPassword = !this.eyeShowPassword;

    if(this.eyeShowPassword)
      $('#password').attr('type','text');
    else
      $('#password').attr('type','password');
  }
}
