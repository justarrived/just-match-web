import {Http} from '@angular/http';
import {NgModule} from '@angular/core';
import {TranslateLoader} from 'ng2-translate/src/translate.service';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import {TranslateStaticLoader} from 'ng2-translate/src/translate.service';

export function translateLoaderFactory(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  imports: [TranslateModule.forRoot({
    provide: TranslateLoader,
    useFactory: translateLoaderFactory,
    deps: [Http]
  })],
  exports: [TranslateModule]
})
export class AppTranslateModule { }
