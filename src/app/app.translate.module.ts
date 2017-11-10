import {HttpClient} from '@angular/common/http';
import {Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {NgModule} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {PLATFORM_ID} from '@angular/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader} from '@ngx-translate/core';
import {TranslateModule} from '@ngx-translate/core';

declare var require: any;

export class TranslateUniversalLoader implements TranslateLoader {
  private fs = require('fs');

  constructor(
    private prefix: string = 'i18n',
    private suffix: string = '.json',
  ) {
  }

  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      observer.next(JSON.parse(this.fs.readFileSync(`${this.prefix}/${lang}${this.suffix}`, 'utf8')));
      observer.complete();
    });
  }
}

export function createTranslateLoader(platformId: any, http: HttpClient): TranslateLoader {
  if (isPlatformBrowser(platformId)) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
  } else {
    return new TranslateUniversalLoader('./src/assets/i18n', '.json');
  }
}

@NgModule({
  imports: [TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [PLATFORM_ID, HttpClient]
    }
  })],
  exports: [TranslateModule]
})
export class AppTranslateModule {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
  ) {
  }
}
