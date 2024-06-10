import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user/account/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/account/login/login.component';
import { SettingProfileComponent } from './components/user/manager/setting-profile/setting-profile.component';
import { ManagerComponent } from './components/user/manager/manager.component';
import { EditCvComponent } from './components/user/manager/edit-cv/edit-cv.component';
import { JoblistComponent } from './components/jobs/joblist/joblist.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard-recruiter/dashboard/dashboard.component';
import { PostJobComponent } from './components/dashboard-recruiter/post-job/post-job.component';
import { authGuard } from './service/auth/auth.guard';
import { DashboardAdminContentComponent } from './components/dashboard-admin/dashboard-admin-content/dashboard-admin-content.component';
import { ManagermentjobComponent } from './components/dashboard-admin/manager-job/manager-job.component';
import { CodeAdminComponent } from './components/dashboard-admin/codes-admin/code-admin.component';
import { ProfileRecruiterComponent } from './components/dashboard-recruiter/profile-recruiter/profile-recruiter.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'easyjob', pathMatch: 'full'
  },
  {
    path: 'easyjob',
    title: 'Thế giới việc làm',
    component: HomeComponent
  },
  {
    path: 'dashboard-recruiter', redirectTo: 'dashboard-recruiter/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard-recruiter/dashboard',
    title: 'Nhà tuyển dụng | Dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-recruiter/cong-viec',
    title: 'Nhà tuyển dụng | Đăng công việc',
    component: PostJobComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-recruiter/cap-nhat-thong-tin',
    title: 'Nhà tuyển dụng | Cập nhật thông tin',
    component: ProfileRecruiterComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-admin', redirectTo: 'dashboard-admin/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard-admin/dashboard',
    title: 'Nhà tuyển dụng | Dashboard',
    component: DashboardAdminContentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-admin/code',
    title: 'Nhà tuyển dụng | Tùy chỉnh',
    component: CodeAdminComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-admin/quan-ly-cong-viec',
    title: 'Nhà tuyển dụng | Tùy chỉnh',
    component: ManagermentjobComponent,
    canActivate: [authGuard]
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
    canActivate: [authGuard]
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
