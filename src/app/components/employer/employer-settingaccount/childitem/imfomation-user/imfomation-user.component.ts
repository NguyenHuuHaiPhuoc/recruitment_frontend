import { Component, OnInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListResult } from '@angular/fire/compat/storage/interfaces';
import Swal from 'sweetalert2';

import { OptionDetailService } from '../../../../../service/option-detail/option-detail-service.service';
import { RecruiterService } from '../../../../../service/user/recruiter/recruiter.service';
import { AuthService } from '../../../../../service/auth/auth-service.service';
import { AccountService } from '../../../../../service/user/account.service';

declare var $:any;
@Component({
  selector: 'app-imfomation-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './imfomation-user.component.html',
  styleUrl: './imfomation-user.component.scss',
  providers: [
    AuthService,
    AccountService,
    OptionDetailService,
    RecruiterService
  ]
})
export class InfomationUserComponent implements OnInit{
  public recruiter:any = null;
  public optionGender:any = [];
  public optionLevel:any = [];
  public formRecruiter: FormGroup;
  public avatarReview:any = null;
  private uploadAvatar:any = null;

  private account = this.authService.getAccount();

  constructor(
    private formbuilder:FormBuilder,
    private authService: AuthService,
    private accountService: AccountService,
    private optionDetailService: OptionDetailService,
    private recruiterService: RecruiterService,
    private fireStorage: AngularFireStorage,
    private router: Router
  ){
    this.formRecruiter = formbuilder.group({
      id: [null],
      email:[null, Validators.required],
      phone:[null, Validators.required],
      gender:['NO', Validators.required],
      img: [null],
      create_date: [null],
      update_date: new Date(),
      account: {
        id: this.account.id.split('_')[0]
      }
    })
  }

  ngOnInit(): void {
      this.loadData();
  }
  
  private loadData(){
    this.optionDetailService.optionDetailByOptionType('LEVEL').subscribe({
      next: (resp) => {
        if(resp.status == 200){
          this.optionLevel = resp.listResult;
        }
      },
      error(err) {
          console.error(err);
      },
    });

    this.optionDetailService.optionDetailByOptionType('GENDER').subscribe({
      next: (resp) => {
        if(resp.status == 200){
          this.optionGender = resp.listResult;
        }
      },
      error(err) {
          console.error(err);
      },
    });

    this.recruiterService.recruiterByAccountID(this.account.id.split('_')[0]).subscribe({
      next: (resp) => {
        if(resp.status == 200)
          this.recruiter = resp.result;

        $('#fullName').val(this.account.full_name);
        this.avatarReview = resp.result.img;

        this.formRecruiter.setValue({
          id: resp.result.id,
          email:resp.result.email,
          phone:resp.result.phone,
          gender:resp.result.gender,
          img: resp.result.img,
          create_date: resp.result.create_date,
          update_date: new Date(),
          account: {
            id: resp.result.account.id
          }
        });
      },
      error(err) {
          console.error(err);
      },
    });
  }

  public updateRecruiter() {
    if(
      this.formRecruiter.value.img != null
      &&
      this.uploadAvatar != null
    ){
      this.changeImageFireBase(this.formRecruiter.value.img);
    }

    if(this.uploadAvatar != null)
      this.saveImage();
    
    this.recruiterService.updateRecruiter(this.formRecruiter.value).subscribe({
      next: (resp) => {
        if (resp.status == 405){
          Swal.fire({
            position: "center",
            icon: "warning",
            title: resp.message,
            showConfirmButton: false,
            timer: 1500
            });
            return;
        }
        if(resp.status == 200) {
          const requetToAccount = {
            fullName: $('#fullName').val()
          }
          this.accountService.updateFullname(this.account.id.split('_')[0],requetToAccount).subscribe({
            next: (resp) => {
              if (resp.status == 200) {
                const account = {
                  id: resp.result.id + '_' +resp.result.username,
                  username: resp.result.username,
                  create_date: resp.result.create_date,
                  is_del: resp.result.is_del,
                  full_name: resp.result.full_name,
                  roles: resp.role
                  };
                  this.authService.login(account);
                  $('#fullName').val(resp.result.full_name);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Cập nhật thành công!',
                    showConfirmButton: false,
                    timer: 1500
                  });
              }
            },
          });
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  public imageReview(e: any){
    const file = e.target.files;
    if(file && file[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.avatarReview = e.target.result;
      reader.readAsDataURL(file[0]);
      this.uploadAvatar = file[0]
    } else {
      this.uploadAvatar = null;
    }
  }

  public verifyPhone(){
    this.router.navigateByUrl('employer-dashboard/phone-verify');
  }

  private async saveImage() {
    const filePath = `images/recruiter/avatar/${this.uploadAvatar.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const uploadTask = await this.fireStorage.upload(filePath,this.uploadAvatar);
    try {
      const url = await uploadTask.ref.getDownloadURL();
      
      const request = {
        imgUrl: url
      };
      this.recruiterService.uploadAvatar(this.recruiter.id, request).subscribe();
    } catch (error) {
      console.error('Error getting download URL:', error);
    }
  }

  private async changeImageFireBase(image:any){
    const filePath = `images/recruiter/avatar`;
    const fileRef = this.fireStorage.ref(filePath);
    fileRef.listAll().subscribe((result: ListResult) => {
      result.items.forEach(async item => {
        try {
          const url = await item.getDownloadURL();
          if (url.includes(image)){
            await item.delete();
            console.log('Đã cập nhật avatar');
          }
        } catch (error) {
          console.error(`Lỗi khi lấy URL của ${item.name}:`, error);
        }
      });
    });
  }
}
