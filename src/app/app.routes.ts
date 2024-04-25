import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { JobdetailComponent } from './components/jobs/jobdetail/jobdetail.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/user/account/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/account/login/login.component';
import { SettingProfileComponent } from './components/user/manager/setting-profile/setting-profile.component';
import { ManagerComponent } from './components/user/manager/manager.component';

export const routes: Routes = [
  
  {
    path: 'easyjob',
    title: 'Thế giới việc làm',
    component: HomeComponent
  },
  {
    path: 'viec-lam/cong-ty',
    title: 'Công ty TNHH ABC',
    component: JobdetailComponent,
  },
  {
    path: 'about',
    title: 'Về chúng tôi',
    component: AboutComponent,
  },
  {
    path: 'contact',
    title: 'Liên hệ',
    component: ContactComponent,
  },
  {
    path: 'u/cap-nhat-thong-tin-ca-nhan',
    title: 'Cài đặt thông tin cá nhân | EasyJob',
    component: SettingProfileComponent,
  },
  {
    path: 'u/cv-managerment',
    title: 'EasyJob - Việc làm hàng đầu',
    component: ManagerComponent,
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
