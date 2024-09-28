import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EmployerNewsComponent } from '../employer-news/employer-news.component';
import { AuthService } from '../../../service/auth/auth-service.service';
import { RecruiterService } from '../../../service/user/recruiter/recruiter.service';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-employer-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    EmployerNewsComponent,
  ],
  templateUrl: './employer-home.component.html',
  styleUrl: './employer-home.component.scss',
  providers: [
    AuthService,
    RecruiterService
  ]
})
export class EmployerHomeComponent implements OnInit, OnDestroy{
  

  public showFiller = false;
  public user:any = [];
  public avatar:any = null;
  public collapsed:boolean = false;
  private subscription?: Subscription;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
    private recruiterService: RecruiterService,
  ) {
    const checkInterval = interval(5000);
    this.subscription = checkInterval.subscribe(() => {
      this.loadData()
    });
  }

  ngOnInit(): void {
    
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadData() {
    this.user = this.authService.getAccount();
      
    this.recruiterService.recruiterByAccountID(this.user.id.split('_')[0]).subscribe({
      next: (resp) => {
        this.avatar = resp.result.img;
      },
      error(err) {
          console.error(err);
      },
    });
  }
  
  public openSlideBar() {
    this.collapsed = !this.collapsed;
    
  }

  public logout () {
    const username = this.authService.getAccount().username;
    localStorage.removeItem(username+'_jwtToken');
    localStorage.removeItem('stageUrl');
    this.authService.logout();
    this.router.navigate(['/dang-nhap']);
  }
}
