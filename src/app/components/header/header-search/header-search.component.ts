
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [],
  templateUrl: './header-search.component.html',
  styleUrl: './header-search.component.scss'
})
export class HeaderSearchComponent {
  @ViewChild('toggleButton') toggleButton!:ElementRef;
  @ViewChild('menu') menu!:ElementRef;
  
  public popupshow:boolean =  true;
  
  constructor(private renderer: Renderer2) {
    
  }
  
  onInputClick(){
    this.popupshow= !this.popupshow;
  }

}