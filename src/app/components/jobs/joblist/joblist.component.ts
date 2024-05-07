import { Component } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-joblist',
  standalone: true,
  imports: [],
  templateUrl: './joblist.component.html',
  styleUrl: './joblist.component.scss'
})
export class JoblistComponent {
  private btnFilter:boolean = false;

  openFilter () {
    this.btnFilter = !this.btnFilter;
    if(this.btnFilter)
      $('.search-job').addClass('btnFilter');
    else 
      $('.search-job').removeClass('btnFilter');
  }
}
