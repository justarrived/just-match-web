import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
