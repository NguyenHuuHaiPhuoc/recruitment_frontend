import { Component,OnInit,AfterViewInit, OnDestroy  } from '@angular/core';
import { AuthService } from '../../../service/auth/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { OptionDetailService } from '../../../service/option-detail/option-detail-service.service';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Subscription, interval } from 'rxjs';
import { ApplicantService } from '../../../service/user/applicant/applicant.service';

@Component({
  selector: 'app-header-menustart',
  standalone: true,
  imports: [
    HttpClientModule,MatButtonModule, MatMenuModule, RouterLink
  ],
  templateUrl: './header-menustart.component.html',
  styleUrl: './header-menustart.component.scss',
  providers:[
    AuthService,
    OptionDetailService,
    ApplicantService
  ]
})
export class HeaderMenustartComponent implements OnInit, OnDestroy{
  public technologiesUsing:any = [];
  public levels:any = [];
  public avatar:any = null;
  public applicant:any = [];
  public isLogin:any = false;
  public user:any = this.authService.getAccount();;

  private subscription?: Subscription;

  constructor(
    private authService: AuthService,
    private detailService: OptionDetailService,
    private applicantService: ApplicantService,
    private router: Router
  ) {
    const checkInterval = interval(1000 * 60);
    this.subscription = checkInterval.subscribe(() => {
      this.loadData();
    });
  }
   
   ngOnInit(): void{
    this.loadData();
    this.isLogin = this.authService.isLoggedIn();
   }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadData(){

    this.detailService.getOptionDetailTechnologiesUsing().subscribe((data) => {
      this.technologiesUsing = data;
    });

    this.detailService.getOptionDetailLevel().subscribe((data) => {
      this.levels = data;
    });
    
    if (this.isLogin){
      this.applicantService.findApplicantByAccountID(this.user.id.split('_')[0]).subscribe({
        next:(resp) => {
          if(resp.status == 200){
            this.applicant = resp.result;
            this.avatar = resp.result.img;
          }
        },
        error(err) {
          console.error(err);   
        },
      });
    }
  }

  public onLogout(){
    const username = this.authService.getAccount().username;
    localStorage.removeItem(username+'_jwtToken');
    localStorage.removeItem('stageUrl');
    this.authService.logout();
    this.router.navigate(['/dang-nhap']);
  }
    
}