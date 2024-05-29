import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [MatTabsModule , CKEditorModule , FormsModule,CommonModule , ReactiveFormsModule],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss'
})
export class CampaignComponent {
  public error:boolean = false;
  
    public Editor = ClassicEditor;
    userForm: FormGroup;
    constructor( private formbuilder: FormBuilder){
      this.userForm = this.formbuilder.group({
            location_recruitment:[
              '',[Validators.required]
            ],
            minSalary:[
              '',[Validators.required]
            ],
            maxSalary:[
              '',[Validators.required]
            ],
            experience:[
              '',[Validators.required]
            ],
            limitDateRecruitment:[
              '',[Validators.required]
            ],
            location:[
              '',[Validators.required]
            ],
            locationDetail:[
              '',[Validators.required]
            ],
            timeWork:[
              '',[Validators.required]
            ]
            ,
            descriptionJob:[
              '',[Validators.required]
            ]
            ,
            candidateRequirement:[
              '',[Validators.required]
            ]
            ,
            benefit:[
              '',[Validators.required]
            ]
      })
    }
  submitForm(){
    if(this.userForm.invalid){
     this.error = true;
  }else if(this.userForm.valid){
    this.error = false;
  }
  }

}
