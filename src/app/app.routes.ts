import { Routes } from '@angular/router';
import { AboutComponent } from './body/about/about.component';
import { HomeComponent } from './body/home/home.component';
import { JobListNewComponent } from './body/home/job-list-new/job-list-new.component';
import { JobdetailComponent } from './body/jobs/jobdetail/jobdetail.component';
import { JobcategoryComponent } from './body/home/jobcategory/jobcategory.component';
import { NotFoundComponent } from './body/error/not-found/not-found.component';
import { ContactComponent } from './body/contact/contact.component';

export const routes: Routes = [
  { path: 'body-about', component: AboutComponent },
  { path: 'body-home', component: HomeComponent },
  { path: 'body-job-list', component: JobListNewComponent },
  { path: 'body-job-detail', component: JobdetailComponent },
  { path: 'body-job-category', component: JobcategoryComponent },
  { path: 'body-error-404', component: NotFoundComponent },
  { path: 'body-contact', component: ContactComponent },
];
