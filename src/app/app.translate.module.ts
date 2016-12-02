import {NgModule} from '@angular/core';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import {TranslateLoader, TranslateStaticLoader} from 'ng2-translate/src/translate.service';
import {Http} from '@angular/http';

export function translateLoaderFactory(http: any) {
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
