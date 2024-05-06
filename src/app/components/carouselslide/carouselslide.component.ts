import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carouselslide',
  standalone: true,
  imports: [SlickCarouselModule],
  templateUrl: './carouselslide.component.html',
  styleUrl: './carouselslide.component.scss'
})
export class CarouselslideComponent {

 config = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay:true,
  dots: true,
  arrows: false,
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
   {logo: "assets/img/com-logo-1.jpg",
    name:"vin"
  },
  {logo: "assets/img/com-logo-1.jpg",
    name:"vin"
  },
  {logo: "assets/img/com-logo-1.jpg",
    name:"vin"
  },
  {logo: "assets/img/com-logo-1.jpg",
    name:"vin"
  },
  {logo: "assets/img/com-logo-1.jpg",
    name:"vin"
  }
 
 ]
}
