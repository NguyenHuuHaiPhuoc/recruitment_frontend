
import { AuthService } from '../../../service/auth/auth-service.service';
import { Router } from '@angular/router';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-header-menustart',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './header-menustart.component.html',
  styleUrl: './header-menustart.component.scss'
})
export class HeaderMenustartComponent   {
    user:any = [];
  isLogin:any = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
   
   ngOnInit() {
    this.user = this.authService.getAccount();
    this.isLogin = this.authService.isLoggedIn();
   }

   onLogout(){
    this.authService.logout();
    this.router.navigate(['/dang-nhap']);
   }
    
}