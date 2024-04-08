import { Component,AfterViewInit } from '@angular/core';
var $ : any;
@Component({
  selector: 'app-feedback-clients',
  standalone: true,
  imports: [],
  templateUrl: './feedback-clients.component.html',
  styleUrl: './feedback-clients.component.scss'
})

export class FeedbackClientsComponent implements AfterViewInit {
 
ngAfterViewInit(): void {
   $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
}
}
