import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  // Disable console logging on production
  window.console.log = function(){},
  window.console.info = function(){},
  window.console.error = function(){},
  window.console.warn = function(){},
  
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
