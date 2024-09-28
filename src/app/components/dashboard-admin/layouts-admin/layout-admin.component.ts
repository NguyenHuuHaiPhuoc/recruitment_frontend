import { Component } from "@angular/core";
import { DashboardAdminBodyComponent } from "../dashboard-admin-body/dashboard-admin-body.component";
import { SideNavAdminComponent } from "../side-nav-admins/side-nav-admin.component";

declare var $:any;
interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}
@Component ({
    selector: 'app-layout-admin',
    standalone: true,
    imports: [
        SideNavAdminComponent,
        DashboardAdminBodyComponent
    ],
    templateUrl: './layout-admin.component.html',
    styleUrl: './layout-admin.component.scss',
    providers: []
})
export class LayoutAdminComponent{
    public isSidenavCollapsed = false;
    screenWidth = 0;
    onToggleSideNav (data: SideNavToggle):void {
        this.isSidenavCollapsed = data.collapsed;
        this.screenWidth = data.screenWidth;
    }
}