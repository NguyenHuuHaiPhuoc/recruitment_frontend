import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { JobdetailComponent } from './components/jobs/jobdetail/jobdetail.component';
// import { JobcategoryComponent } from './components/home/home/jobcategory/jobcategory.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/Utilities-icons/account/register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'the-gioi-viec-lam',
    title: 'Thế giới việc làm',
    component: HomeComponent
  },
  // {
  //   path: 'viec-lam',
  //   title: 'Danh sách công việc',
  //   component: JobListNewComponent,
  // },
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
    path: 'dang-ky',
    title: 'Đăng ký',
    component: RegisterComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
