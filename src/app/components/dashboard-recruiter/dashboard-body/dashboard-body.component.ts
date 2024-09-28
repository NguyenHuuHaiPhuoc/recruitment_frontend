import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../service/auth/auth-service.service';
import { RecruiterService } from '../../../service/user/recruiter/recruiter.service';

@Component({
  selector: 'app-dashboard-body',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './dashboard-body.component.html',
  styleUrl: './dashboard-body.component.scss',
  providers: [
    AuthService
    ,RecruiterService
  ]
})
export class DashboardBodyComponent implements OnInit{
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  public account:any = this.authService.getAccount();
  public isLogin:boolean = false;
  public avatar:any = null;

  constructor(
    private authService: AuthService,
    private recruiterService: RecruiterService,
    private router: Router
  ) {}
  ngOnInit ():void {
    this.recruiterService.recruiterByAccountID(this.account.id.split('_')[0]).subscribe({
      next: (resp) => {
        this.avatar = resp.result.img;
      },
      error(err) {
          console.error(err);
      },
    });
    this.isLogin = this.authService.isLoggedIn();
  }
  getClassBody():string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }

  public logout () {
    const username = this.authService.getAccount().username;
    localStorage.removeItem(username+'_jwtToken');
    localStorage.removeItem('stageUrl');
    this.authService.logout();
    this.router.navigate(['/dang-nhap']);
  }
}
