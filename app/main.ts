///<reference path="../typings/index.d.ts"/>

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {APP_CONFIG} from "./config/config";
import {enableProdMode} from "@angular/core";

const platform = platformBrowserDynamic();

if (APP_CONFIG['ENABLE_PROD_MODE']) {
  enableProdMode();
}

platform.bootstrapModule(AppModule);
