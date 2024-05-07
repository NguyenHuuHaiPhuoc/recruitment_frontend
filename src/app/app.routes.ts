import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user/account/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/account/login/login.component';
import { SettingProfileComponent } from './components/user/manager/setting-profile/setting-profile.component';
import { ManagerComponent } from './components/user/manager/manager.component';
import { EditCvComponent } from './components/user/manager/edit-cv/edit-cv.component';
import { JoblistComponent } from './components/jobs/joblist/joblist.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';

export const routes: Routes = [
  
  {
    path: 'easyjob',
    title: 'Thế giới việc làm',
    component: HomeComponent
  },
  {
    path: 'viec-lam',
    title: 'Thế giới việc làm',
    component: JoblistComponent
  },
  // {
  //   path: 'testimonial',
  //   title: 'Thế giới việc làm',
  //   component: JoblistComponent
  // },
  // {
  //   path: 'viec-lam/cong-ty',
  //   title: 'Công ty TNHH ABC',
  //   component: JobdetailComponent,
  // },
  // {
  //   path: 'about',
  //   title: 'Về chúng tôi',
  //   component: AboutComponent,
  // },
  // {
  //   path: 'contact',
  //   title: 'Liên hệ',
  //   component: ContactComponent,
  // },
  {
    path: 'u/cap-nhat-thong-tin-ca-nhan',
    title: 'Cài đặt thông tin cá nhân | EasyJob',
    component: SettingProfileComponent,
  },
  {
    path: 'u/cv',
    title: 'EasyJob - Việc làm hàng đầu',
    component: ManagerComponent,
  },
  {
    path: 'u/cv/edit',
    title: 'EasyJob - Việc làm hàng đầu',
    component: EditCvComponent,
  },
  {
    path: 'dang-ky',
    title: 'Đăng ký',
    component: RegisterComponent,
  },
  {
    path: 'dang-nhap',
    title: 'Đăng nhập',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
