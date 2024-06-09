import { Component } from "@angular/core";

declare var $:any;
@Component({
    selector: 'back-to-top',
    standalone: true,
    imports: [],
    templateUrl: './back-to-top.component.html',
    styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {
    
    backToTop () {
        window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }
}