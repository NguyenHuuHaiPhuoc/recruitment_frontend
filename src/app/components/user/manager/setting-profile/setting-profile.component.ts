import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    AuthService
  ]
})
export class SettingProfileComponent implements OnInit{
  public user:any = [];
  public image_preview = '/assets/img/users/icon-user-male-default.png';
  public currentFile?: File;
  public formUser : FormGroup;
  constructor(
    private authService: AuthService
    , private fb : FormBuilder
  ) {
    this.formUser = this.fb.group ({
      full_name: [null],
      phone: [null]
    });
  }

  ngOnInit(){
    this.user = this.authService.getAccount();
    this.formUser?.setValue({
      full_name: this.user.full_name,
      phone: null
    });
    $('#email').attr('disabled',true);
    $('#email').text(this.user.username);
  }

  onUpload(){
    const input_upload = document.getElementById('avatar_image');

    input_upload?.click();
    
  }

  // Hiển thị và lưu ảnh người dùng (đang sử lý)
  selectImage(event: any) : void{
    const selectFile = event.target.files;
    const reader = new FileReader();
    if (selectFile && selectFile.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log(file);
      reader.onload = () => {
        
        // this.formUser.get('avatar').setValue({
        //   filename: file.name,
        //   filetype: file.type,
        //   value: reader.result.split(',')[1]
        // })
      };
      // this.image_preview = file.name;
      // console.log(reader.result);
    }
    
  }
}
