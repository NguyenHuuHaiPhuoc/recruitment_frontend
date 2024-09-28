import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarouselslideComponent } from '../carouselslide/carouselslide.component';
import { QuickSearchComponent } from '../quick-search/quick-search.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { JobService } from '../../service/Job/job-service.service';
import { Subscription, interval } from 'rxjs';
import { CompanyService } from '../../service/user/recruiter/company.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    QuickSearchComponent,
    SlickCarouselModule,
    CarouselslideComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    JobService,
    CompanyService
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public res: any;
  public listNewJobs:any = [];
  public listCompany:any = [];
  public listFilterTechUse:any = [];
  // url: string = './assets/test.json';
  public loading: boolean = false;
  public btn_loadmore: boolean = true;
  public logo:any = 'https://firebasestorage.googleapis.com/v0/b/recruitmentweb-b9ddb.appspot.com/o/images%2Frecruiter%2Fhuawei-logo_1716391412586?alt=media&token=dd4131c7-4609-4ad2-8a32-bce99cc4948b';
  private subscription?: Subscription;

  constructor(
    private jobService: JobService,
    private companyService: CompanyService,
    private http: HttpClient
  ) {
    const checkInterval = interval(1000*60);
    this.subscription = checkInterval.subscribe(() => {
      this.newJobs();
    });
  }

  ngOnInit(): void {
    this.companyService.findCompanyByJobCreateBy().subscribe({
      next:(resp) => {
        if(resp.status == 200){
          this.listCompany = resp.listResult;
          // this.listCompany.forEach((c:any) => {
          //   this.logo = c.image;
          // });
        }
      },
      error(err) {
        console.error(err);
      },
    })
    this.newJobs()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private newJobs (){
    this.jobService.getNewJob().subscribe({
      next:(resp) => {
        if(resp.status == 200){
          this.listNewJobs = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      },
    })
  }

  //hiển thị thêm 5 công việc sau mỗi lần click
  loadmore() {
    this.loading = true;
    // window.setTimeout(() => {
    //   this.limit += 5;
    //   this.http.get(this.url).subscribe((data: any) => {
    //     this.res = data.slice(0, this.limit);
    //   });
    //   this.loading = false;
    // }, 700);
  }

  config = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,

    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  config_newJob = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,

    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  config_list_language = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,

    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  companys = [
    { logo: 'assets/img/logo/company/fpt.png', name: 'FPT' },
    { logo: 'assets/img/logo/company/logovin.webp', name: 'vin' },
    { logo: 'assets/img/logo/company/yamahalogo.jpg', name: 'Yamaha' },
    { logo: 'assets/img/logo/company/lglogo.png', name: 'LG' },
    { logo: 'assets/img/logo/company/vng.jpg', name: 'VNG' },
  ];
  // arrayLength = 10;

  // getArray(count: number) {
  //   return new Array(count);
  // }

  public filterTechUse(techUse:any): any{
    this.listFilterTechUse= techUse.split(',');
  }

  // xu ly doan nay, qua tai request
  
}
