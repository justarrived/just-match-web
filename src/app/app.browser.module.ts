import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserTransferStateModule} from './transfer-state/browser-transfer-state.module';
import {NgModule} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';

@NgModule({
	bootstrap: [AppComponent],
	imports: [
    AppModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
			appId: 'just-match-web'
    }),
    BrowserTransferStateModule,
	],
	providers: [
    {
      provide: REQUEST,
      useValue: null
    }
  ]
})
export class AppBrowserModule {}
