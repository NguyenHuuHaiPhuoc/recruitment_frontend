import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth-service.service';
import { AccountService } from '../../../service/user/account.service';
import Swal from 'sweetalert2';
import { RecruiterService } from '../../../service/user/recruiter/recruiter.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile-recruiter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile-recruiter.component.html',
  styleUrl: './profile-recruiter.component.scss',
  providers: [
    AuthService,
    AccountService,
    RecruiterService
  ]
})
export class ProfileRecruiterComponent implements OnInit{

  public formChangePaassword: FormGroup;
  public formUpdateProfile: FormGroup;
  public avatarReview:any = '';
  private uploadAvatar:any = null;
  private user = this.authService.getAccount();
  
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private accountService:AccountService,
    private recruiterService: RecruiterService,
    private fireStorage: AngularFireStorage,
  ) {
    this.formChangePaassword = this.fb.group(
      {
      oldPass: [null, [Validators.required]],
      newPass: [null, [Validators.required]],
      confirmPass: [null, [Validators.required]]
      },
      {
        validators:[this.passwordMatchValidator]
      }
    );

    this.formUpdateProfile = this.fb.group({
      email: [null],
      fullName: [null],
      gender: [null],
      phone: [null],
      createDate: [null],
      updateDate: [null]
    })
  }

  ngOnInit(): void {
      this.loadData();
  }

  private idRecruiter:any = 0;
  public loadData() {
    this.recruiterService.recruiterByAccountID(this.user.id.split('_')[0]).subscribe({
      next: (resp) => {
          if (resp.status == 200) {
            this.idRecruiter = resp.result.id;
            this.formUpdateProfile.setValue({
              email: resp.result.email,
              fullName: this.user.full_name,
              gender: resp.result.gender,
              phone: resp.result.phone,
              createDate: resp.result.create_date,
              updateDate: resp.result.update_date,
            });
            this.avatarReview = resp.result.img;
          }
      },
      error(err) {
          console.error(err);
      },
    })
  }

  public updatePassword(){
    const username = this.user.id.split('_')[1];
    let request = {
      oldPass: this.formChangePaassword.value.oldPass,
      newPass: this.formChangePaassword.value.newPass
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
    })
  }

  public cancleUpdate() {
    this.loadData();
  }

  public updaterecruiter (){
    let recruiter = {
      id: this.idRecruiter,
      email: this.formUpdateProfile.value.email,
      phone: this.formUpdateProfile.value.phone,
      gender: this.formUpdateProfile.value.gender,
      img: '',
      create_date: this.formUpdateProfile.value.createDate,
      update_date: new Date(),
      account: {
        id: this.user.id.split("_")[0]
      }
    }

    this.recruiterService.updateRecruiter(recruiter).subscribe({
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
            fullName: this.formUpdateProfile.value.fullName
          }
          this.accountService.updateFullname(this.user.id.split('_')[0],requetToAccount).subscribe({
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
                this.formUpdateProfile.get('fullName')?.patchValue(resp.result.full_name);
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
          
          if(this.uploadAvatar != null){
            this.saveImage()
          }
        }
      },
      error(err) {
        console.error(err);
      },
    });
              
  }

  private async saveImage() {
    const filePath = `images/recruiter/avatar/${this.uploadAvatar.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const uploadTask = await this.fireStorage.upload(filePath,this.uploadAvatar);
    try {
      const url = await uploadTask.ref.getDownloadURL();
      
      const request = {
        imgUrl: url
      };
      this.recruiterService.uploadAvatar(this.idRecruiter, request).subscribe();
    } catch (error) {
      console.error('Error getting download URL:', error);
    }
  }

  public imageReview(e: any){
    const file = e.target.files;
    if(file && file[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.avatarReview = e.target.result;
      reader.readAsDataURL(file[0]);
      this.uploadAvatar = file[0]
    }
  }
  // update company

  private passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('newPass')?.value == formGroup.get('confirmPass')?.value ? null : { passwordMismatch: true };
  }

  private resetFormChangePass() {
    this.formChangePaassword.setValue({
      oldPass: [null],
      newPass: [null],
      confirmPass: [null]
    })
  }
}
