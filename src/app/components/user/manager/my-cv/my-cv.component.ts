import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { MySkillComponent } from '../my-skill/my-skill.component';
import { MyExpComponent } from '../my-exp/my-exp.component';
import { MyProjectComponent } from '../my-project/my-project.component';
import { AuthService } from '../../../../service/auth/auth-service.service';
import { ApplicantService } from '../../../../service/user/applicant/applicant.service';
import { MyEducationComponent } from '../my-education/my-education.component';



declare var $: any;
@Component({
  selector: 'app-my-cv',
  standalone: true,
  imports: [
    MySkillComponent,
    MyExpComponent,
    MyProjectComponent,
    MyEducationComponent,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule
  ],
  templateUrl: './my-cv.component.html',
  styleUrl: './my-cv.component.scss',
  providers: [
    ApplicantService,
    AuthService
  ]
})
export class MyCvComponent implements OnInit{
  
  public avatarReview = null;
  public applicant:any = [];
  public account = this.authServive.getAccount();

  public formApplicant: FormGroup;
  
  
  configEditor: AngularEditorConfig = {
    editable : true,
    spellcheck : true,
    height : "10rem",
    minHeight : '5rem',
    translate : 'yes',
    defaultParagraphSeparator : 'p',
    defaultFontName : 'Times new Roman'
  }
  
  constructor (
    private applicantService: ApplicantService,
    private authServive: AuthService,
    private fb: FormBuilder
  ) {
    this.formApplicant = this.fb.group({
      id: [null],
      positions: [null],
      email: [null],
      phone: [null],
      address: [null],
      img: [null],
      sumary: [null],
      app_view: [null],
      create_date: [null],
      update_date: new Date(),
      account: [null],
      gender: [null],
      experience: [null],
    });
  }
  
  ngOnInit (): void {
    this.loadData();
  }

  private loadData(){
    this.applicantService.findApplicantByAccountID(this.account.id.split('_')[0]).subscribe({
      next:(resp) => {
        if(resp.status == 200){
          this.applicant = resp.result;
          
          this.formApplicant.get('id')?.setValue(resp.result.id);
          this.formApplicant.get('positions')?.setValue(resp.result.positions);
          this.formApplicant.get('email')?.setValue(resp.result.email);
          this.formApplicant.get('phone')?.setValue(resp.result.phone);
          this.formApplicant.get('address')?.setValue(resp.result.address);
          this.formApplicant.get('img')?.setValue(resp.result.img);
          this.formApplicant.get('sumary')?.setValue(resp.result.sumary);
          this.formApplicant.get('app_views')?.setValue(resp.result.app_views);
          this.formApplicant.get('create_date')?.setValue(resp.result.create_date);
          this.formApplicant.get('account')?.setValue(resp.result.account);
          this.formApplicant.get('gender')?.setValue(resp.result.gender);
          this.formApplicant.get('experience')?.setValue(resp.result.experience);
          
          this.avatarReview = resp.result.img;
        }
      },
      error(err) {
        console.error(err);   
      }
    });
  }

  public openUpdateModal () {
    $('#btn-modal-updateInfoUser').trigger('click');
  }
  
  public updateApplicant () {
    // console.log(this.formApplicant.value)
    this.applicantService.updateApplicant(this.formApplicant.value).subscribe({
      next: (resp) => {
        if(resp.status == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: resp.messagge,
            showConfirmButton: false,
            timer: 1500,
          });
          $('#form-applicant-close').trigger('click'); 
        }
      },
      error(err) {
        console.error(err);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Cập nhật thất bại!',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }
  
}
