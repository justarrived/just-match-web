import {AppModule} from './app/';
import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {prebootClient} from 'preboot/__build/src/browser/preboot_browser';

if (environment.production) {
  // Disable console logging on production
  window.console.log = function(){};
  window.console.info = function(){};
  window.console.error = function(){};
  window.console.warn = function(){};

  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    console.log('Replay preboot events!');
    prebootClient().complete();
  });
