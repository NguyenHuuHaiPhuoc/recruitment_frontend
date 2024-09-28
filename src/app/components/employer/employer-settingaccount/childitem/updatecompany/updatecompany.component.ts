import { Component, OnInit } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListResult } from '@angular/fire/compat/storage/interfaces';

import Swal from 'sweetalert2';
import moment from 'moment';

import { AuthService } from '../../../../../service/auth/auth-service.service';
import { CompanyService } from '../../../../../service/user/recruiter/company.service';
import { OptionDetailService } from '../../../../../service/option-detail/option-detail-service.service';

declare var $:any;
@Component({
  selector: 'app-updatecompany',
  standalone: true,
  imports: [
    CKEditorModule,
    ReactiveFormsModule
   ],
  templateUrl: './updatecompany.component.html',
  styleUrl: './updatecompany.component.scss',
  providers: [
    AuthService,
    CompanyService,
    OptionDetailService
  ]
})
export class UpdatecompanyComponent implements OnInit{
  public Editor = ClassicEditor;
  public account = this.authService.getAccount();
  public formCompany: FormGroup;
  private skillOption:any = [];
  public skillOptionFilter:any = [];
  public listSkill:any = [];
  public selectHidden:boolean = true;
  public logoReview:any = null;
  private logoChange:any = null;

  constructor(
    private companyService: CompanyService,
    private authService: AuthService,
    private opDetailService: OptionDetailService,
    private fb: FormBuilder,
    private fireStorage: AngularFireStorage
  ) {
    this.formCompany = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      tax_code: [null, [Validators.required]],
      image: [null, [Validators.required]],
      business_type: [null, [Validators.required]],
      skill:[null],
      headquarter: [null, [Validators.required]],
      establishment_date: [null, [Validators.required]],
      sumary: [null, [Validators.required]],
      web_url: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      create_date: [null, [Validators.required]],
      recruiter: {
        id: this.account.id.split('_')[0]
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
    // this.getAllFiles('');
  }
  
  private loadData(){
    this.companyService.findCompanyByRecruiterID(this.account.id.split('_')[0]).subscribe({
      next:(resp) => {
        if(resp.status == 200){
          this.formCompany.setValue({
            id: resp.result.id,
            name: resp.result.name,
            tax_code: resp.result.tax_code,
            image: resp.result.image,
            business_type: resp.result.business_type,
            skill: resp.result.skill,
            headquarter: resp.result.headquarter,
            establishment_date: moment(resp.result.establishment_date).format('YYYY-MM-DD'),
            sumary: resp.result.sumary,
            web_url: resp.result.web_url,
            email: resp.result.email,
            phone: resp.result.phone,
            create_date: resp.result.create_date,
            recruiter: {
              id: resp.result.recruiter.id
            }
          });
          
          this.listSkill = resp.result.skill.split(',');
          this.logoReview = resp.result.image;
        }
      },
      error(err) {
        console.error(err);
      },
    });

    this.opDetailService.optionDetailByOptionType('TECH').subscribe({
      next:(resp) => {
        if(resp.status == 200){
          this.skillOption = resp.listResult;
          this.skillOptionFilter = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  private async deleteImageFireBase(image:any){
    const filePath = `images/recruiter/company`;
    const fileRef = this.fireStorage.ref(filePath);
    fileRef.listAll().subscribe((result: ListResult) => {
      result.items.forEach(async item => {
        try {
          const url = await item.getDownloadURL();
          if (url.includes(image)){
            await item.delete(); // Xóa logo cũ khỏi Firebase Storage
            console.log('Đã cập nhật logo');
          }
        } catch (error) {
          console.error(`Lỗi khi lấy URL của ${item.name}:`, error);
        }
      });
    });
  }

  public async updateCompany(){
    let skill = '';
    const lastItem = this.listSkill[this.listSkill.length - 1];
    this.listSkill.forEach((item:any) => {
      if(item.includes(lastItem))
        skill += item;
      else
        skill += item + ',';
    });
    this.formCompany.get('skill')?.setValue(skill);

    if (this.logoChange != null){
      // this.deleteImageFireBase(this.formCompany.value.image);

      let filePath = `images/recruiter/company/${this.logoChange.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const uploadTask = await this.fireStorage.upload(filePath,this.logoChange);
      try {
        const url = await uploadTask.ref.getDownloadURL();
        this.formCompany.get('image')?.setValue(url);
        this.saveCompany();
      } catch (error) {
        console.error('Error getting download URL:', error);
        throw error;
      }
    }
    
    this.saveCompany();
  }

  private saveCompany(){
      this.companyService.recruiterUpdateCompany(this.formCompany.value).subscribe({
        next: (resp) => {
          if(resp.status == 404){
            Swal.fire({
              position: "center",
              icon: "warning",
              title: resp.message,
              showConfirmButton: false,
              timer: 1500
            });
          }

          if(resp.status == 200){
            Swal.fire({
              position: "center",
              icon: "success",
              title: resp.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.loadData();
          }
        },
        error(err) {
            console.error(err);
        },
      });
  }
  
  public changeLogo(event:any){
    const file = event.target.files;
    if(file && file[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.logoReview = e.target.result;
      reader.readAsDataURL(file[0])
      this.logoChange = file[0];
    }else {
      this.logoReview = '/assets/img/logos/logo-company-review.png';
      this.logoChange = null;
    }
  }

  public openSkillOption() {
    this.selectHidden = !this.selectHidden;
    if(this.selectHidden)
      $('.list-skill').attr('size',0);
    else
      $('.list-skill').attr('size',10);
  }

  public focusInput(){this.selectHidden = false;}

  public chooseSkill(skillName:any){
    const existSkill = this.listSkill.filter((item:any) =>{
      return item.includes(skillName);
    } );

    if(existSkill.length == 0)
      this.listSkill.push(skillName);

    if($('.search-skill').val() != '')
      $('.search-skill').val('');
    this.selectHidden = true;
  }

  public removeChooseSkill(skillName:any){
    this.listSkill = this.listSkill.filter((item:any) => item != skillName);
  }

  public searchSkill(event:any){
    this.selectHidden = false;
    const value = event.target.value;
    
    this.skillOptionFilter = this.skillOption.filter((item:any) =>{
      return item.option_name.toLowerCase().includes(value.toLowerCase());
    });
    
    if(this.skillOptionFilter.length > 10)
      $('.list-skill').attr('size',10);
    else{
      $('.list-skill').attr('size',this.skillOptionFilter.length);
    }
  }
}
