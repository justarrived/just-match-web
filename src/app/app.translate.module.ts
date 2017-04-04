import {Http} from '@angular/http';
import {NgModule} from '@angular/core';
import {TranslateLoader} from '@ngx-translate/core';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }
  })],
  exports: [TranslateModule]
})
export class AppTranslateModule { }
