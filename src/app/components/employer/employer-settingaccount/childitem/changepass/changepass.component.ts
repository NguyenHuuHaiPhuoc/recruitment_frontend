import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder ,ValidatorFn ,ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../../../service/auth/auth-service.service';
import { AccountService } from '../../../../../service/user/account.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepass',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.scss',
  providers: [
    AuthService,
    AccountService
  ]
})
export class ChangepassComponent {
  public formChangePaassword: FormGroup;
  private user = this.authService.getAccount()
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private accountService: AccountService
  ){
  this.formChangePaassword = this.formBuilder.group(
    {
      password_current:['',[Validators.required]],
      password_new:[
        '',[
            Validators.required,
            Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/)
           ]],
      password_confirm:['',[Validators.required]]
    },{
      validators:[this.passwordMatchValidator]
    }
    )
  }

  public updatePassword(){
    const username = this.user.id.split('_')[1];
    let request = {
      oldPass: this.formChangePaassword.value.password_current,
      newPass: this.formChangePaassword.value.password_new
    }
    
    this.accountService.changePassword(username,request).subscribe({
      next: (resp) => {
        if (resp.status == 500){
          Swal.fire({
            position: "center",
            icon: "warning",
            title: resp.message,
            showConfirmButton: false,
            timer: 1500
          });
        }else if(resp.status = 200){
          Swal.fire({
            position: "center",
            icon: "success",
            title: resp.message,
            showConfirmButton: false,
            timer: 1500
          });
          const account = {
            id: resp.result.id + '_' +resp.result.username,
            username: resp.result.username,
            create_date: resp.result.create_date,
            is_del: resp.result.is_del,
            full_name: resp.result.full_name,
            roles: resp.role
          };
          this.authService.login(account);
          this.resetFormChangePass()
        } 
      },
      error(err) {
        console.error(err);
      },
    });
  }
  
  public resetFormChangePass() {
    this.formChangePaassword.setValue({
      password_current:[null],
      password_new:[null],
      password_confirm:[null]
    })
  }
   // kiem tra xac nhan trung khop mat khau
  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password_new')?.value;
    const confirmPass = formGroup.get('password_confirm')?.value;
    return password === confirmPass ? null : { passwordMismatch: true };
  }
}
