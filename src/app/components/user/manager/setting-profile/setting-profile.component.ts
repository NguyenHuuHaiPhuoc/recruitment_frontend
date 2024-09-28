import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../service/auth/auth-service.service';
import { ApplicantService } from '../../../../service/user/applicant/applicant.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListResult } from '@angular/fire/compat/storage/interfaces';
import { AccountService } from '../../../../service/user/account.service';

declare var $:any;
@Component({
  selector: 'app-setting-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './setting-profile.component.html',
  styleUrl: './setting-profile.component.scss',
  providers: [
    ApplicantService,
    AuthService,
    AccountService
  ]
})
export class SettingProfileComponent implements OnInit{
  public applicant: any = [];
  public app_view = 0;
  public formUser : FormGroup;
  public avataReview:any = null;

  private account = this.authServive.getAccount();
  private avatarUpload:any = null;

  constructor(
    private fb : FormBuilder,
    private applicantService: ApplicantService,
    private authServive: AuthService,
    private accountService: AccountService,
    private fireStorage: AngularFireStorage,
  ) {
    this.formUser = this.fb.group ({
      full_name: [null],
      phone: null,
      email: null
    });
  }
  
  ngOnInit(){
    this.loadData();
  }
  
  private loadData(){
    this.applicantService.findApplicantByAccountID(this.account.id.split('_')[0]).subscribe({
      next:(resp) => {
        if(resp.status == 200){
          this.applicant = resp.result;
          this.formUser.setValue({
            full_name: resp.result.account.full_name,
            phone: resp.result.phone,
            email: resp.result.email
          });
          this.avataReview = resp.result.img;
          this.app_view = resp.result.app_view;
        }
      },
      error(err) {
        console.error(err);   
      },
    });
  }

  // Hiển thị và lưu ảnh người dùng (đang sử lý)
  public selectImage(event: any) : void{
    const file = event.target.files;
    if(file && file[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.avataReview = e.target.result;
      reader.readAsDataURL(file[0]);
      this.avatarUpload = file[0]
    } else {
      this.avataReview = null;
      this.avatarUpload = null;
    }
  }

  public updateApplicant(){
    if(this.avatarUpload != null && this.applicant.img != null){
      this.changeImageFireBase(this.applicant.img);
    }

    if(this.avatarUpload != null){
      this.uploadAvatarFirebase();
    }

    if (this.applicant.account.full_name != this.formUser.get('full_name')?.value){
      const request = {
        fullName: this.formUser.get('full_name')?.value
      }
      this.accountService.updateFullname(this.account.id.split('_')[0], request).subscribe();
    }

    if(
      this.avatarUpload != null
      ||
      this.applicant.phone != this.formUser.get('phone')?.value
    ){
      this.applicant.phone = this.formUser.get('phone')?.value;
      this.applicant.update_date = new Date();
      
      this.applicantService.updateApplicant(this.applicant).subscribe({
        next:(resp) => {
          if(resp.status == 405){
            Swal.fire({
              position: "center",
              icon: "success",
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
          }
          this.loadData();
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }

  private async uploadAvatarFirebase() {
    const filePath = `images/applicant/avatar/${this.avatarUpload.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const uploadTask = await this.fireStorage.upload(filePath,this.avatarUpload);
    try {
      const url = await uploadTask.ref.getDownloadURL();
      this.applicant.img = url;
      
      this.applicantService.updateApplicant(this.applicant).subscribe();
    } catch (error) {
      console.error('Error getting download URL:', error);
    }
  }

  private async changeImageFireBase(image:any){
    const filePath = `images/applicant/avatar`;
    const fileRef = this.fireStorage.ref(filePath);
    fileRef.listAll().subscribe((result: ListResult) => {
      result.items.forEach(async item => {
        try {
          const url = await item.getDownloadURL();
          if (url.includes(image)){
            await item.delete();
            console.log('Đã loại bỏ avatar cũ!');
          }
        } catch (error) {
          console.error(`Lỗi khi lấy URL của ${item.name}:`, error);
        }
      });
    });
  }
}
