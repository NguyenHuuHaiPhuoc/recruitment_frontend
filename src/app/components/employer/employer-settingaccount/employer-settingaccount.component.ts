import { Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { Location } from '@angular/common';
import { ChangepassComponent } from './childitem/changepass/changepass.component';

@Component({
  selector: 'app-employer-settingaccount',
  standalone: true,
  imports: [RouterModule, ChangepassComponent],
  templateUrl: './employer-settingaccount.component.html',
  styleUrl: './employer-settingaccount.component.scss'
})
export class EmployerSettingaccountComponent {


 constructor(private location: Location){}

  getURL() : string {
    const path: string = this.location.path();
    const segments: string[] = path.split('/');
    const lastSegment: string = segments[segments.length - 1];
    return lastSegment;
  }
}
