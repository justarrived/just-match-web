import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from "./views/about/about.component";
import {HomeComponent} from "./views/home/home.component";
import {ModuleWithProviders} from "@angular/core";

import { AuthGuard } from "./services/auth-guard.service";
import {UserRegisterComponent} from "./views/user/user-register/user-register.component";
import {UserProfileComponent} from "./views/user/user-profile/user-profile.component";

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, data: { roles: ['company']} },
  { path: 'about', component: AboutComponent, data: {title: 'About', roles: ['company'] }, canActivate: [AuthGuard]},
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user', component: UserProfileComponent }, // TODO: restrict for logged in users
  { path: '**', redirectTo: 'home' }
];

export const appRoutingProviders: any[] = [AuthGuard];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {initialNavigation: false});
