import { Component  } from '@angular/core';
import { AuthService } from '../../../service/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menustart',
  standalone: true,
  imports: [],
  templateUrl: './header-menustart.component.html',
  styleUrl: './header-menustart.component.scss'
})
export class HeaderMenustartComponent   {
  public user:any = [];
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
