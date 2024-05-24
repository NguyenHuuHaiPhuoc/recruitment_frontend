import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../service/auth/auth-service.service';

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
  ]
})
export class DashboardBodyComponent implements OnInit{
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  public user:any = [];
  public isLogin:boolean = false;

  constructor(
    private authService: AuthService
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
}
