import { CommonModule } from "@angular/common";
import { Component, Output , EventEmitter, OnInit, HostListener } from "@angular/core";
import { RouterLink ,RouterLinkActive } from "@angular/router";
import { navbarData } from "./navData";


declare var $:any;
interface SideNavToggle{
    screenWidth: number;
    collapsed: boolean;
}
@Component ({
    selector: 'app-side-nav-admin',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './side-nav-admin.component.html',
    styleUrl: './side-nav-admin.component.scss',
    providers: []
})
export class SideNavAdminComponent implements OnInit {
    public collapsed:boolean = false;
    public screenWidth = 0;
    public data = navbarData;

    @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
    @HostListener('window: resize', ['$event'])
    onResize(event: any){
        this.screenWidth = window.innerWidth;
        if(this.screenWidth <= 768){
            this.collapsed = false;
            this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
        }
    }

    ngOnInit ():void {
        this.screenWidth = window.innerWidth;
    }

    toggleCollapsed ():void {
        this.collapsed = !this.collapsed;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
    closeSideNav ():void {
        this.collapsed = false;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
}