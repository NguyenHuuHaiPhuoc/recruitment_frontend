import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderMenustartComponent } from './components/header/header-menustart/header-menustart.component';
import { HeaderCarouselstrartComponent } from './components/header/header-carouselstrart/header-carouselstrart.component';
import { HeaderSearchComponent } from './components/header/header-search/header-search.component';
import { FooterComponent } from './components/footer/footer.component';

// import the cloundinaryModule
// import the cloundinary classer

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderMenustartComponent,
    HeaderCarouselstrartComponent,
    HeaderSearchComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  title = 'my-demo';
 
  images = [
    {
      imageSrc:'./assets/img/header-carouselstart/hinh1.jpg',
      imageAlt: 'nature1',
    },
    {
      imageSrc:'./assets/img/header-carouselstart/hinh2.jpg',
      imageAlt: 'nature2',
    },
    {
      imageSrc:'./assets/img/header-carouselstart/vinhome1.jpg',
      imageAlt: 'person1',
    }
  ];
   

  constructor(private location: Location){}

  getURL() : string {
    const path: string = this.location.path();
    const segments: string[] = path.split('/');
    const lastSegment: string = segments[segments.length - 1];
    return lastSegment;
  }

}
