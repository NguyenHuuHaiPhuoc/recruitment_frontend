import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth-service.service';

@Component({
  selector: 'app-setting-profile',
  standalone: true,
  imports: [],
  templateUrl: './setting-profile.component.html',
  styleUrl: './setting-profile.component.scss'
})
export class SettingProfileComponent {
  public user:any = [];
  public image_preview = '/assets/img/users/icon-user-male-default.png';
  public currentFile?: File;
  constructor(private authService: AuthService) {
    
  }

  ngOnInit(){
    this.user = this.authService.getAccount();
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
