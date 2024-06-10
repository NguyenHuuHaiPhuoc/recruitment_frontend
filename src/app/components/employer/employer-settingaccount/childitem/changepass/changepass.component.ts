import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder ,ValidatorFn ,ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-changepass',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.scss'
})
export class ChangepassComponent {
  userForm: FormGroup;
  
 constructor(private formBuilder: FormBuilder){
  this.userForm = this.formBuilder.group(
    {
      password_new:[
        '',[
            Validators.required,
            Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/)
           ]],
       password_current:[
        '',[Validators.required]],
      password_confirm:[
        '',[Validators.required]
      ]
    },{
      validators:[this.passwordMatchValidator]
    }
    )
 }
   // kiem tra xac nhan trung khop mat khau
    passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password_new')?.value;
    const confirmPass = formGroup.get('password_confirm')?.value;
    return password === confirmPass ? null : { passwordMismatch: true };
  }
}
