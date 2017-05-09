import {AppBrowserModule} from './app/app.browser.module';
import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

if (environment.production) {
  // Disable console logging on production
  window.console.log = function(){};
  window.console.info = function(){};
  window.console.error = function(){};
  window.console.warn = function(){};

  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppBrowserModule);
