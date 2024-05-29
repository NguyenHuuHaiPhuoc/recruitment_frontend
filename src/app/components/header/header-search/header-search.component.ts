import { NgIf } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header-search.component.html',
  styleUrl: './header-search.component.scss'
})
export class HeaderSearchComponent {
  popupshow:boolean =  false;
  @ViewChild('toggleButton') toggleButton!:ElementRef;
  @ViewChild('menu') menu!:ElementRef;
  onInputClick(){
  this.popupshow= true;
  }


  constructor(private renderer: Renderer2) {
    /**
     * This events get called by all clicks on the page
     */
    
    this.renderer.listen('window', 'click',(e:Event)=>{
          if(this.popupshow===true){
        if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
            this.popupshow=false;
        }
        }
    });
  }
  

}
