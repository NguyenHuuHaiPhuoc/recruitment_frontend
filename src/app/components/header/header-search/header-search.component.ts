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
         /**
          * Only run when toggleButton is not clicked
          * If we don't check this, all clicks (even on the toggle button) gets into this
          * section which in the result we might never see the menu open!
          * And the menu itself is checked here, and it's where we check just outside of
          * the menu and button the condition abbove must close the menu
          */
        if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
            this.popupshow=false;
        }
    });
  }

}
