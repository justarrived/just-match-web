import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserTransferStateModule} from './transfer-state/browser-transfer-state.module';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
	bootstrap: [AppComponent],
	imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: 'just-match-web'
    }),
    BrowserTransferStateModule,
    AppModule
	]
})
export class AppBrowserModule {}
