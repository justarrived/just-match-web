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
  private static readonly fallbackLanguageCode: string = 'en';
  private static readonly openGraphLocaleMap = {
    'ar_AR': 'ar',
    'en_US': 'en',
    'fa_IR': 'fa',
    'ku_TR': 'ku',
    'ps_AF': 'ps',
    'sv_SE': 'sv',
  };
  private static readonly storageSystemLanguageCodeKey: string = 'systemLanguageCode';
  private static readonly systemLanguageCodeFacebookParam: string = 'fb_locale';
  private static readonly systemLanguageCodeParam1: string = 'locale';
  private static readonly systemLanguageCodeParam2: string = 'lang';
  private static readonly systemLanguagesStateTransferKey: string = 'systemLanguages';

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

    let systemLanguages = this.transferState.get(SystemLanguagesResolver.systemLanguagesStateTransferKey);

    if (systemLanguages) {
      this.init(systemLanguages);
      return Promise.resolve(systemLanguages);
    }

    return this.languageProxy.getLanguages({
      'filter[system_language]': true
    })
    .then(systemLanguages => {
      this.transferState.set(SystemLanguagesResolver.systemLanguagesStateTransferKey, systemLanguages);
      this.init(systemLanguages);
      return systemLanguages;
    });
  }

  private init(languages: Language[]): void {
    this.translateService.addLangs(languages.map(language => language.languageCode));
    this.translateService.setDefaultLang(SystemLanguagesResolver.fallbackLanguageCode);

    this.systemLanguages = languages;

    let systemLanguageCode = this.dataStoreService.getCookie(SystemLanguagesResolver.storageSystemLanguageCodeKey) || 'sv';
    this.systemLanguage = this.systemLanguages.find(language => language.languageCode === systemLanguageCode);
    this.dataStoreService.setCookie(SystemLanguagesResolver.storageSystemLanguageCodeKey, systemLanguageCode);
    this.translateService.use(systemLanguageCode);

    this.initRouteParamsSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.route.queryParams.subscribe(params => {

      let systemLanguageCode =
        params[SystemLanguagesResolver.systemLanguageCodeParam1] ||
        params[SystemLanguagesResolver.systemLanguageCodeParam2] ||
        this.mapFromOpenGraphLocale(params[SystemLanguagesResolver.systemLanguageCodeFacebookParam]);

      if (systemLanguageCode) {

        let language = this.systemLanguages.find(language => language.languageCode === systemLanguageCode);

        if (language) {
          this.systemLanguage = language;
          this.dataStoreService.setCookie(SystemLanguagesResolver.storageSystemLanguageCodeKey, systemLanguageCode);
          this.translateService.use(systemLanguageCode);
        }
      }
    });
  }

  private mapFromOpenGraphLocale(openGraphLocale: string): string {
    return SystemLanguagesResolver.openGraphLocaleMap[openGraphLocale];
  }

  public getSystemLanguages(): Language[] {
    return this.systemLanguages;
  }

  public setSystemLanguage(language: Language): void {
    if (!this.systemLanguages.some(systemLanguage => systemLanguage.languageCode === language.languageCode)) {
      throw language.languageCode + ' is not a valid system language';
    }

    this.systemLanguage = language;
    this.dataStoreService.setCookie(SystemLanguagesResolver.storageSystemLanguageCodeKey, language.languageCode);
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
