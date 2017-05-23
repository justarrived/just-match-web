import {ActivatedRoute} from '@angular/router';
import {DataStoreService} from '../../services/data-store.service';
import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import {Language} from '../../models/api-models/language/language';
import {LanguageProxy} from '../../proxies/language/language.proxy';
import {Resolve} from '@angular/router';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {TransferState} from '../../transfer-state/transfer-state';

@Injectable()
export class SystemLanguagesResolver implements Resolve<Language[]> {
  private readonly fallbackLanguageCode: string = 'en';
  private readonly storageSystemLanguageCodeKey: string = 'systemLanguageCode';

  private systemLanguage: Language;
  private systemLanguageChange: EventEmitter<Language> = new EventEmitter<Language>();
  private systemLanguages: Language[];

  public constructor(
    private dataStoreService: DataStoreService,
    private languageProxy: LanguageProxy,
    private route: ActivatedRoute,
    private router: Router,
    private transferState: TransferState,
    private translateService: TranslateService,
  ) {
  }

  public resolve(): Promise<Language[]> {
    if (this.systemLanguages) {
      return Promise.resolve(this.systemLanguages);
    }

    let systemLanguages = this.transferState.get('systemLanguages');

    if (systemLanguages) {
      this.init(systemLanguages);
      return Promise.resolve(systemLanguages);
    }

    return this.languageProxy.getLanguages({
      'filter[system_language]': true
    })
    .then(systemLanguages => {
      this.transferState.set('systemLanguages', systemLanguages);
      this.init(systemLanguages);
      return systemLanguages;
    });
  }

  private init(languages: Language[]): void {
    this.translateService.addLangs(languages.map(language => language.languageCode));
    this.translateService.setDefaultLang(this.fallbackLanguageCode);

    this.systemLanguages = languages;

    let systemLanguageCode = this.dataStoreService.getCookie(this.storageSystemLanguageCodeKey) || 'sv';
    this.systemLanguage = this.systemLanguages.find(language => language.languageCode === systemLanguageCode);
    this.dataStoreService.setCookie(this.storageSystemLanguageCodeKey, systemLanguageCode);
    this.translateService.use(systemLanguageCode);

    this.initRouteParamsSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.route.queryParams
    .subscribe(params => {
      let systemLanguageCode = params['locale'] || params['lang'] || this.mapFromOpenGraphLocale(params['fb_locale']);
      if (systemLanguageCode) {
        let language = this.systemLanguages.find(language => language.languageCode === systemLanguageCode);
        if (language) {
          this.systemLanguage = language;
          this.dataStoreService.setCookie(this.storageSystemLanguageCodeKey, systemLanguageCode);
          this.translateService.use(systemLanguageCode);
        }
      }
    });
  }

  private mapFromOpenGraphLocale(openGraphLocale: string): string {
    const openGraphLocaleMap = {
      'ar_AR': 'ar',
      'en_US': 'en',
      'fa_IR': 'fa',
      'ku_TR': 'ku',
      'ps_AF': 'ps',
      'sv_SE': 'sv',
    }

    return openGraphLocaleMap[openGraphLocale];
  }

  public getSystemLanguages(): Language[] {
    return this.systemLanguages;
  }

  public setSystemLanguage(language: Language): void {
    if (!this.systemLanguages.some(systemLanguage => systemLanguage.languageCode === language.languageCode)) {
      throw language.languageCode + ' is not a valid system language';
    }

    this.systemLanguage = language;
    this.dataStoreService.setCookie(this.storageSystemLanguageCodeKey, language.languageCode);
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
