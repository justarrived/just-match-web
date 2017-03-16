import {DataStore} from './data-store.service';
import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import {Language} from '../models/language/language';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Injectable()
export class TranslationService {
  public static readonly STORAGE_SELECTED_LANGUAGE_KEY: string = 'selectedLanguage';
  public static readonly SUPPORTED_LANGUAGE_CODES: string[] = ['ar', 'en', 'fa', 'fa_AF', 'ku', 'ps', 'sv', 'ti'];
  public static readonly FALLBACK_LAMGUAGE_CODE: string = 'en';

  private languageChange: EventEmitter<any> = new EventEmitter();
  private selectedLanguage: Language;

  public constructor(
    private dataStore: DataStore,
    private translateService: TranslateService
  ) {
    this.initService();
  }

  public initService() {
    this.translateService.addLangs(TranslationService.SUPPORTED_LANGUAGE_CODES);
    this.translateService.setDefaultLang(TranslationService.FALLBACK_LAMGUAGE_CODE);
    let selectedLanguage = this.dataStore.get(TranslationService.STORAGE_SELECTED_LANGUAGE_KEY) ||
      new Language({lang_code: 'sv', local_name: 'Svenska'});
    this.setLanguage(selectedLanguage);
  }

  public setLanguage(language: Language) {
    this.selectedLanguage = language;
    this.dataStore.set(TranslationService.STORAGE_SELECTED_LANGUAGE_KEY, language);
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
