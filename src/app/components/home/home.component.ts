import { Component } from '@angular/core';
import { QuickSearchComponent } from '../quick-search/quick-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuickSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
