import { Component } from "@angular/core";
import { Router } from "@angular/router";

declare var $:any;
@Component({
    selector: 'app-edit-cv',
    standalone: true,
    imports: [],
    templateUrl: './edit-cv.component.html',
    styleUrl: './edit-cv.component.scss'
})

export class EditCvComponent {
    constructor (
        private router: Router
    ){}
    
    backToCV () {
        this.router.navigate(['/u/cv']);
    }
}
