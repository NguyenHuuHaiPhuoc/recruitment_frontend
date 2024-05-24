import { Component } from "@angular/core";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { DashboardBodyComponent } from "../dashboard-body/dashboard-body.component";

declare var $:any;
interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}
@Component ({
    selector: 'app-dashboard-recruiter',
    standalone: true,
    imports: [
        SideNavComponent,
        DashboardBodyComponent
    ],
    templateUrl: './dashboard-recruiter.component.html',
    styleUrl: './dashboard-recruiter.component.scss',
    providers: []
})
export class DashboardRecruiterComponent{
    public isSidenavCollapsed = false;
    screenWidth = 0;
    onToggleSideNav (data: SideNavToggle):void {
        this.isSidenavCollapsed = data.collapsed;
        this.screenWidth = data.screenWidth;
    }
}