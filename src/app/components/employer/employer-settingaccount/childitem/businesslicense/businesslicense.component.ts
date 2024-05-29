import { Component } from '@angular/core';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { HttpClient } from '@angular/common/http';
import {  FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder ,ValidatorFn ,ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-businesslicense',
  standalone: true,
  imports: [FilePickerModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './businesslicense.component.html',
  styleUrl: './businesslicense.component.scss'
})
export class BusinesslicenseComponent {
  userForm: FormGroup;

  constructor(private formbuilder: FormBuilder){
    this.userForm = formbuilder.group({
      filemain:[
        '',[
          Validators.required
        ]
      ]
    });
  }
}
