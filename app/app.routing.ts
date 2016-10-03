import {Routes, RouterModule} from '@angular/router';
import {TaskListComponent} from "./views/todo/task-list.component";
import {AboutComponent} from "./views/about/about.component";
import {HomeComponent} from "./views/home/home.component";
import {ModuleWithProviders} from "@angular/core";

import { AuthGuard } from "./services/auth-guard.service";

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, data: { roles: ['company']} },
  { path: 'tasks', component: TaskListComponent, data: {title: 'TaskList' }, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent, data: {title: 'About', roles: ['company'] }, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'tasks' }
];

export const appRoutingProviders: any[] = [AuthGuard];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {initialNavigation: false});
