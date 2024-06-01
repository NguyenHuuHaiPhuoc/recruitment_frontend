import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../service/auth/auth-service.service';

@Component({
  selector: 'app-dashboard-body',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './dashboard-admin-body.component.html',
  styleUrl: './dashboard-admin-body.component.scss',
  providers: [
    AuthService
  ]
})
export class DashboardAdminBodyComponent implements OnInit{
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  public user:any = [];
  public isLogin:boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit ():void {
    this.user = this.authService.getAccount();
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
