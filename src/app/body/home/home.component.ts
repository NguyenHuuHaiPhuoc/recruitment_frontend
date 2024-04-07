import { Component } from '@angular/core';
import { AboutwebsiteComponent } from './aboutwebsite/aboutwebsite.component';
import { FeedbackClientsComponent } from './feedback-clients/feedback-clients.component';
import { JobListNewComponent } from './job-list-new/job-list-new.component';
import { JobcategoryComponent } from './jobcategory/jobcategory.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutwebsiteComponent,
    FeedbackClientsComponent,
    JobListNewComponent,
    JobcategoryComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
