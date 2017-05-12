import {APP_BOOTSTRAP_LISTENER} from '@angular/core';
import {AppComponent} from './app.component';
import {ApplicationRef} from '@angular/core';
import {AppModule} from './app.module';
import {BrowserModule} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {NgModule} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ServerModule} from '@angular/platform-server';
import {ServerTransferStateModule} from './transfer-state/server-transfer-state.module';
import {TransferState} from './transfer-state/transfer-state';

export function onBootstrap(appRef: ApplicationRef, transferState: TransferState) {
  return () => {
    appRef.isStable
      .filter(stable => stable)
      .first()
      .subscribe(() => {
        transferState.inject();
      });
  };
}

@NgModule({
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: onBootstrap,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState
      ]
    }
  ],
  imports: [
    AppModule,
    BrowserModule.withServerTransition({
      appId: 'just-match-web'
    }),
    NoopAnimationsModule,
    ServerModule,
    ServerTransferStateModule,
  ]
})
export class AppServerModule {}
