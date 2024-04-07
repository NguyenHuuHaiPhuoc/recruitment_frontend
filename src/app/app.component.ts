import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderCarouselstrartComponent } from './header/header-carouselstrart/header-carouselstrart.component';
import { HeaderMenustartComponent } from './header/header-menustart/header-menustart.component';
import { HeaderSearchComponent } from './header/header-search/header-search.component';
import { HomeComponent } from './body/home/home.component';
import { BodyComponent } from './body/body.component';
import { RegisterComponent } from './Utilities-icons/account/register/register.component';
import { SigninComponent } from './Utilities-icons/account/signin/signin.component';
import { FeedbackClientsComponent } from './body/home/feedback-clients/feedback-clients.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RegisterComponent,
    SigninComponent,
    RouterOutlet,
    HeaderCarouselstrartComponent,
    HeaderMenustartComponent,
    HeaderSearchComponent,
    BodyComponent,
    HomeComponent,
    FeedbackClientsComponent,
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-demo';
  images = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1640844444545-66e19eb6f549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'person2',
    },
  ]
  
}
