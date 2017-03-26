import {DataStore} from '../../services/data-store.service';
import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import {Language} from '../../models/api-models/language/language';
import {LanguageProxy} from '../../services/proxy/language-proxy.service';
import {Resolve} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Injectable()
export class SystemLanguagesResolver implements Resolve<Language[]> {
  private readonly fallbackLanguageCode: string = 'en';
  private readonly storageSystemLanguageCodeKey: string = 'systemLanguageCode';

  private systemLanguage: Language;
  private systemLanguageChange: EventEmitter<Language> = new EventEmitter<Language>();
  private systemLanguages: Language[];

  public constructor(
    private dataStore: DataStore,
    private languageProxy: LanguageProxy,
    private translateService: TranslateService
  ) {
  }

  public resolve(): Promise<Language[]> {
    if (this.systemLanguages) {
      return Promise.resolve(this.systemLanguages);
    }

    return this.languageProxy.getSystemLanguages()
    .then(result => {
      this.init(result);
      return result;
    });
  }

  public init(languages: Language[]) {
    this.translateService.addLangs(languages.map(language => language.languageCode));
    this.translateService.setDefaultLang(this.fallbackLanguageCode);

    this.systemLanguages = languages;

    let systemLanguageCode = this.dataStore.get(this.storageSystemLanguageCodeKey) || 'sv';
    this.systemLanguage = this.systemLanguages.find(language => language.languageCode === systemLanguageCode);
    this.dataStore.set(this.storageSystemLanguageCodeKey, systemLanguageCode);
    this.translateService.use(systemLanguageCode);
  }

  public getSystemLanguages(): Language[] {
    return this.systemLanguages;
  }

  public setSystemLanguage(language: Language): void {
    if (!this.systemLanguages.some(systemLanguage => systemLanguage.languageCode === language.languageCode)) {
      throw language.languageCode + ' is not a valid system language';
    }

    this.systemLanguage = language;
    this.dataStore.set(this.storageSystemLanguageCodeKey, language.languageCode);
    this.translateService.use(language.languageCode);
    this.systemLanguageChange.emit(this.systemLanguage);
  }

  public getSelectedSystemLanguage(): Language {
    return this.systemLanguage;
  }

  public getSelectedSystemLanguageCode(): string {
    return this.systemLanguage.languageCode;
  }

  public getSystemLanguageChangeEmitter(): EventEmitter<Language>  {
    return this.systemLanguageChange;
  }
}

export abstract class SystemLanguageListener {
  constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(() => {
      this.loadData();
    });
  }

  protected abstract loadData(): void;
}
