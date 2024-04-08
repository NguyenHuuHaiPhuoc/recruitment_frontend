import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'nav', component: NavbarComponent},
    {path: 'register', component: RegisterComponent},
];
