import {Injectable, EventEmitter} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {LanguageProxy} from "./proxy/language-proxy.service";
import {LocalStorageWrapper} from "./local-storage-wrapper.service";
import {orderBy} from "lodash";
import {Language} from "../models/language/language";

@Injectable()
export class TranslationService {
  private storageSelectedLanguageKey: string = 'selectedLanguage';
  private languages: Language[];
  private selectedLanguage: Language;
  private languagesPromise: Promise<any>;
  private languageChange: EventEmitter<any> = new EventEmitter();

  constructor(private translateService: TranslateService, private languageProxy: LanguageProxy, private localStorageWrapper: LocalStorageWrapper) {
    this.translateService.addLangs(['ar', 'en', 'fa', 'fa_AF', 'ku', 'ps', 'sv', 'ti']);
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.getTranslation('en').subscribe(result => {}); // to use the fallback language: https://github.com/ocombe/ng2-translate/issues/185
    this.selectedLanguage = this.localStorageWrapper.getObject(this.storageSelectedLanguageKey) || new Language({id: '38', lang_code: 'en', local_name: 'English'});
    this.languagesPromise = this.languageProxy.getSystemLanguages().then(result => this.languages = orderBy(result, ['languageCode']));
  }

  public setLanguage(language: Language) {
    this.selectedLanguage = language;
    this.localStorageWrapper.setObject(this.storageSelectedLanguageKey, language);
    this.translateService.use(language.languageCode);
    this.languageChange.emit();
  }

  public getSystemLanguages(): Promise<any> {
    if (this.languages) {
      return Promise.resolve(this.languages);
    }

    return this.languagesPromise;
  }

  public getSelectedLanguage(): Language {
    return this.selectedLanguage;
  }

  public getLanguageChangeEmitter() {
    return this.languageChange;
  }

}
