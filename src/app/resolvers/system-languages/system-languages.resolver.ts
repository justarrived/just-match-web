import {Injectable} from '@angular/core';
import {Language} from '../../models/language/language';
import {LanguageProxy} from '../../services/proxy/language-proxy.service';
import {Resolve} from '@angular/router';

@Injectable()
export class SystemLanguagesResolver implements Resolve<Language[]> {
  private systemLanguages: Language[];

  public constructor(
    private languageProxy: LanguageProxy
  ) {
  }

  public resolve(): Promise<Language[]> {
    if (this.systemLanguages) {
      return Promise.resolve(this.systemLanguages);
    }

    return this.languageProxy.getSystemLanguages().then(result => this.systemLanguages = result);
  }

  public getSystemLanguages(): Language[] {
    return this.systemLanguages;
  }
}
