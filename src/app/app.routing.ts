import {Routes, RouterModule} from '@angular/router';
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {ModuleWithProviders} from "@angular/core";

import { AuthGuard } from "./services/auth-guard.service";

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', component: TaskListComponent, data: {title: 'TaskList' }},
  { path: 'about', component: AboutComponent, data: {title: 'About', roles: ['companyUser'] }, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'tasks' }
];

export const appRoutingProviders: any[] = [AuthGuard];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
