import { Component,OnInit} from '@angular/core';
import { QuickSearchComponent } from '../quick-search/quick-search.component';
import { Http2ServerRequest } from 'http2';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselslideComponent } from '../carouselslide/carouselslide.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuickSearchComponent,NgFor,NgIf, SlickCarouselModule , CarouselslideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  res: any;
  url :string  = './assets/test.json';
  limit:number=5;
  loading:boolean = false;
  btn_loadmore:boolean = true;
  slickConfig:any;
  ngOnInit(limit:number =5): void {
    // hiển thị 5 công việc
    this.http.get(this.url).subscribe((data: any) =>{
    this.res = data.slice(0,limit);
    console.log(this.res);
  });

  }
    constructor(private http: HttpClient) {
      this.slickConfig= {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };
   }


  //hiển thị thêm 5 công việc sau mỗi lần click
 loadmore(){
  this.loading = true;
   window.setTimeout(() =>{
   this.limit +=5;
   this.http.get(this.url).subscribe((data: any) =>{
   this.res = data.slice(0,this.limit);
    console.log(this.res);
 });
 this.loading = false;
 },700);
 }

  config = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay:true,
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

 companys =[
  {logo: "assets/img/com-logo-1.jpg",
    name:"vin"
  },
    {logo: "assets/img/logovin.webp",
    name:"vin"
  },
    {logo: "assets/img/logochailease.png",
    name:"chailease"
  },
    {logo: "assets/img/yamahalogo.jpg",
    name:"Yamaha"
  },
    {logo: "assets/img/lglogo.png",
    name:"LG"
  }
  
 
 ]
   arrayLength = 10;

  getArray(count: number) {
    return new Array(count);
  }
}
