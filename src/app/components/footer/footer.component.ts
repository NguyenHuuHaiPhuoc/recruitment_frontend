import { Component } from '@angular/core';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';

declare  var $:any;
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    BackToTopComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  
}
