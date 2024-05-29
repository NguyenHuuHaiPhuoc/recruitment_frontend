import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header-menustart',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './header-menustart.component.html',
  styleUrl: './header-menustart.component.scss'
})
export class HeaderMenustartComponent   {

  construstor(){}

}