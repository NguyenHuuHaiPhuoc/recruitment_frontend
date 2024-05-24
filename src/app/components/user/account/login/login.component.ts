import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../../service/user/account.service';

import Swal from 'sweetalert2';

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

  login(){
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
        
        const account = {
          username: resp.result.username,
          create_date: resp.result.create_date,
          is_del: resp.result.is_del,
          full_name: resp.result.full_name,
          roles: resp.role
        };

        const auth = {
          username: resp.result.username,
          password: resp.result.password
        };
        
        this.authService.login(account);
        this.authService.createToken(auth).subscribe((resp => {
          localStorage.setItem(auth.username+"_jwtToken", resp.token);
        }));
        
        const stageUrl = localStorage.getItem('stageUrl');
        if (resp.role[0] == 2) {
          if(stageUrl != null)
            this.router.navigate([stageUrl]);
          else
            this.router.navigate(['easyjob']);
        } else if(resp.role[0] == 3) {
          this.router.navigate(['dashboard-recruiter/dashboard']);
        } else if(resp.role[0] == 1) {
          this.router.navigate(['dashboard-admin/dashboard']);
        }
      }
    });
  }
}
