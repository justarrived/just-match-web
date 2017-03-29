import {LoggedInGuard} from './logged-in/logged-in.guard';
import {NgModule} from '@angular/core';
import {NotLoggedInGuard} from './not-logged-in/not-logged-in.guard';

@NgModule({
  providers: [
    LoggedInGuard,
    NotLoggedInGuard,
  ]
})
export class GuardsModule {}
