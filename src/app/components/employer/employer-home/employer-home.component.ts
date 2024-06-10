import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Location } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EmployerNewsComponent } from '../employer-news/employer-news.component';


@Component({
  selector: 'app-employer-home',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatSidenavModule , MatIconModule, RouterOutlet,EmployerNewsComponent, RouterModule],
  templateUrl: './employer-home.component.html',
  styleUrl: './employer-home.component.scss'
})
export class EmployerHomeComponent {
  @ViewChild('slidebar') slidebar!: ElementRef;
  @ViewChild('cdkscrollable') cdkscrollable! : ElementRef;
  @ViewChild('contentright') contentright!: ElementRef;
  showFiller = false;
     showslidebar= false;
      openSlideBar(){
      this.showslidebar = !this.showslidebar;
       if(this.showslidebar){
           this.renderer.addClass(this.contentright.nativeElement, 'col-sm-12');
        }else{
          this.renderer.removeClass(this.contentright.nativeElement, 'col-sm-12');
        }
      }
  constructor(private location: Location ,private renderer: Renderer2){}

  getURL() : string {
    const path: string = this.location.path();
    const segments: string[] = path.split('/');
    const lastSegment: string = segments[segments.length - 1];
    return lastSegment;
  }
    
     public open(args: any) {
       console.log("Sidebar Opened");
    }

    public close(args: any) {
        console.log("Sidebar Closed");
    }

}
