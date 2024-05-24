import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../../service/auth/auth-service.service';
import { Router } from '@angular/router';
import { OptionDetailService } from '../../../service/option-detail/option-detail-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header-menustart',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  templateUrl: './header-menustart.component.html',
  styleUrl: './header-menustart.component.scss',
  providers:[
    AuthService,
    OptionDetailService
  ]
})
export class HeaderMenustartComponent implements OnInit{
  public user:any = [];
  public technologiesUsing:any = [];
  public levels:any = [];
  isLogin:any = false;
  constructor(
    private authService: AuthService,
    private detailService: OptionDetailService,
    private router: Router
  ) {}
   
   ngOnInit(): void{
    this.user = this.authService.getAccount();
    this.isLogin = this.authService.isLoggedIn();

    this.detailService.getOptionDetailTechnologiesUsing().subscribe((data) => {
      this.technologiesUsing = data;
    });

    this.detailService.getOptionDetailLevel().subscribe((data) => {
      this.levels = data;
    });
   }

   onLogout(){
    const username = this.authService.getAccount().username;
    localStorage.removeItem(username+'_jwtToken');
    this.authService.logout();
    this.router.navigate(['/dang-nhap']);
   }
}
