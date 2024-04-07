import { NgClass, NgFor, NgIf} from '@angular/common';
import { Component,Input,OnInit,inject,LOCALE_ID, PLATFORM_ID, OnDestroy,NgZone  } from '@angular/core';
import {isPlatformBrowser} from "@angular/common"; // update this
import { clearInterval, setInterval } from 'timers';

interface carouselImages{
  imageSrc:string;
  imageAlt:string;
}

@Component({
  selector: 'app-header-carouselstrart',
  standalone: true,
  imports: [NgClass,NgFor,NgIf],
  templateUrl: './header-carouselstrart.component.html',
  styleUrl: './header-carouselstrart.component.scss'
})

export class HeaderCarouselstrartComponent implements OnInit{
  
  constructor(private ngZone: NgZone){};
  @Input() images :carouselImages[] =[];
  @Input() indicators =true;
  @Input() controls = true;
  @Input() autoSlide = true;
  @Input() slideInterval =2000;
  selectedIndex =0;
   //change slide in every 3 seconds
  
  ngOnInit(): void {
    if(this.autoSlide === true){
      window.setInterval(()=>{
      this.onNextClick();
    },10000);
     }
  }
 
  //sets index of image on dot/indicator click
  selectImage(index:number):void {
    this.selectedIndex = index;
  }
 
  onPrevClick(): void{
    if(this.selectedIndex === 0){
      this.selectedIndex = this.images.length -1;
    }else{
      this.selectedIndex--;
    }
  }
  onNextClick():void{
     
    if(this.selectedIndex === this.images.length -1){
      this.selectedIndex =0;

    }else{
     this.selectedIndex++;
    }
  } 
  
}
