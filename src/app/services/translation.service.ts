import {Injectable, EventEmitter} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {DataStore} from './data-store.service';
import {Language} from '../models/language/language';

@Injectable()
export class TranslationService {
  private storageSelectedLanguageKey: string = 'selectedLanguage';
  private selectedLanguage: Language;
  private languageChange: EventEmitter<any> = new EventEmitter();

  constructor(private translateService: TranslateService, private dataStore: DataStore) {
    this.selectedLanguage = this.dataStore.getObject(this.storageSelectedLanguageKey) || new Language({id: '156', lang_code: 'sv', local_name: 'Swedish'});

    this.translateService.addLangs(['ar', 'en', 'fa', 'fa_AF', 'ku', 'ps', 'sv', 'ti']);
    this.translateService.setDefaultLang('en');
    this.translateService.getTranslation('en').subscribe(() => {}); // to use the fallback language: https://github.com/ocombe/ng2-translate/issues/185

    this.setLanguage(this.selectedLanguage);
  }

  public setLanguage(language: Language) {
    this.selectedLanguage = language;
    this.dataStore.setObject(this.storageSelectedLanguageKey, language);
    this.translateService.use(language.languageCode);
    this.languageChange.emit();
  }

  public getSelectedLanguage(): Language {
    return this.selectedLanguage;
  }

  public getSelectedLanguageCode(): string {
    return this.selectedLanguage.languageCode;
  }

  public getLanguageChangeEmitter() {
    return this.languageChange;
  }

}
