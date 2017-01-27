import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './services/auth-guard.service';
import {JARoutes} from './routes/ja-routes';

const routes: Routes = [];
for (var route in JARoutes){
  routes.push(JARoutes[route]);
}

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: false })],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
