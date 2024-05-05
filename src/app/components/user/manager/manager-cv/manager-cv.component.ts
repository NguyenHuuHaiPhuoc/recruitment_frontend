import { Component } from "@angular/core";
import { Route, Router } from "@angular/router";

declare var $:any;
@Component({
    selector: 'app-manager-cv',
    standalone: true,
    imports: [],
    templateUrl: './manager-cv.component.html',
    styleUrl: './manager-cv.component.scss'
})

export class ManagerCvComponent {
    constructor (
        private router: Router
    ) {}

    openAddCvModal () {$('#btn-add-cv_modal').trigger('click');}
    
}