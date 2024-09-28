import { CommonModule } from "@angular/common";
import { Component, Input, NgZone } from "@angular/core";

@Component({
    selector: 'app-header-carouselstrart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header-carouselstrart.component.html',
    styleUrl: './header-carouselstrart.component.scss'
})
export class HeaderCarouselstrartComponent {
    constructor(private ngZone: NgZone){};
  @Input() images :any =[];
  @Input() indicators =true;
  @Input() controls = true;
  @Input() autoSlide = true;
  @Input() slideInterval =2000;
  public selectedIndex:number = 0;
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