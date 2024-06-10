import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder ,ValidatorFn ,ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-imfomation-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './imfomation-user.component.html',
  styleUrl: './imfomation-user.component.scss'
})
export class ImfomationUserComponent {
  userForm: FormGroup;
  constructor(private formbuilder:FormBuilder){
    this.userForm = formbuilder.group({
      name:['', Validators.required]
    })
  }

}
