import { Component, OnInit } from '@angular/core';
import { MyCvComponent } from './my-cv/my-cv.component';
import { ManagerCvComponent } from './manager-cv/manager-cv.component';
import { JobApplyComponent } from './job-apply/job-apply.component';
import { JobFollowComponent } from './job-follow/fob-follow.component';


@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    MyCvComponent,
    ManagerCvComponent,
    JobApplyComponent,
    JobFollowComponent,
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  
})
export class ManagerComponent implements OnInit{

  ngOnInit(): void {
  }
}
