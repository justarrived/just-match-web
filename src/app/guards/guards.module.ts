import {LoggedInAdminGuard} from './logged-in-admin/logged-in-admin.guard';
import {LoggedInGuard} from './logged-in/logged-in.guard';
import {NgModule} from '@angular/core';
import {NotLoggedInGuard} from './not-logged-in/not-logged-in.guard';

@NgModule({
  providers: [
    LoggedInAdminGuard,
    LoggedInGuard,
    NotLoggedInGuard,
  ]
})
export class GuardsModule {}
