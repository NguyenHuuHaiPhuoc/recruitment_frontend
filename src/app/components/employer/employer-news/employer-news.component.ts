import { Component,Input ,OnInit} from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselslideComponent } from '../../carouselslide/carouselslide.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { clear } from 'console';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employer-news',
  standalone: true,
  imports: [SlickCarouselModule ,
            CarouselslideComponent,
           
          ],
  templateUrl: './employer-news.component.html',
  styleUrl: './employer-news.component.scss'
})
export class EmployerNewsComponent implements OnInit{
  //  @Input() showslides: boolean = false;
  progressValue: number =0;

   constructor(){}
   ngOnInit(): void {
   }



   config =  {
  infinite:false,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows:false,
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

}
