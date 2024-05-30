import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user/account/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/account/login/login.component';
import { SettingProfileComponent } from './components/user/manager/setting-profile/setting-profile.component';
import { ManagerComponent } from './components/user/manager/manager.component';
import { EditCvComponent } from './components/user/manager/edit-cv/edit-cv.component';
import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { JobdetailComponent } from './components/jobs/jobdetail/jobdetail.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/user/account/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/account/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { EmployerHomeComponent } from './components/employer/employer-home/employer-home.component';
import { EmployerNewsComponent } from './components/employer/employer-news/employer-news.component';
import path from 'node:path';
import { Component } from '@angular/core';
import { EmployerSettingaccountComponent } from './components/employer/employer-settingaccount/employer-settingaccount.component';
import { ChangepassComponent } from './components/employer/employer-settingaccount/childitem/changepass/changepass.component';
import { ImfomationUserComponent } from './components/employer/employer-settingaccount/childitem/imfomation-user/imfomation-user.component';
import { BusinesslicenseComponent } from './components/employer/employer-settingaccount/childitem/businesslicense/businesslicense.component';
import { UpdatecompanyComponent } from './components/employer/employer-settingaccount/childitem/updatecompany/updatecompany.component';
import { CampaignComponent } from './components/employer/employer-campaign/campaign.component';

export const routes: Routes = [
  
  {
    path: 'easyjob',
    title: 'Thế giới việc làm',
    component: HomeComponent
  },
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
    path: 'blog',
    title:'blog',
    component: BlogComponent
  },
    {
    path: 'jobdetail',
    title:'detail',
    component: JobdetailComponent
  },
  {
    path: 'employerHome',
    title:'detail',
    component: EmployerHomeComponent,
    children:[
      {
        path: 'news',  // child route path,
        title: 'news',
        component: EmployerNewsComponent
      },{
        path: 'settingaccount',
        title: 'setting account',
        component: EmployerSettingaccountComponent,
        children:[
          {
          path: 'changepassword',
          title: 'Thay đổi mật khẩu',
          component:ChangepassComponent,
          },
          {
            path: 'informationuser',
            title: 'Thông tin cá nhân',
            component: ImfomationUserComponent,
          },
          {
            path: 'businesslicense',
            title:'Giấy phép kinh doanh',
            component: BusinesslicenseComponent
          },
          {
            path:'updatecompany',
            title:'Cập nhật thông tin công ty',
            component: UpdatecompanyComponent
          }
        ]
      },
      {
        path: 'campaign',
        title: 'Chiến dịch tuyển dụng',
        component: CampaignComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
