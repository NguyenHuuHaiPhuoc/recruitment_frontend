import { Component } from "@angular/core";

declare var $:any;
@Component ({
    selector: 'app-job-follow',
    standalone: true,
    imports: [],
    templateUrl: './fob-follow.component.html',
    styleUrl: './fob-follow.component.scss'
})

export class JobFollowComponent{
    public number = [1,2,3,4,5,6];
}