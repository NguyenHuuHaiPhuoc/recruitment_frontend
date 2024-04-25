import { Component } from '@angular/core';
import { MyCvComponent } from './my-cv/my-cv.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MyCvComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {
  
}
