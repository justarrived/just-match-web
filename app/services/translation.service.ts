import {Injectable, OnInit} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";

@Injectable()
export class TranslationService {
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['ar', 'en', 'fa', 'fa_AF', 'ku', 'ps', 'sv', 'ti']);
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.getTranslation('en').subscribe(result => {}); // to use the fallback language: https://github.com/ocombe/ng2-translate/issues/185
  }

  public setLanguage(language: string) {
    this.translateService.use(language);
  }

  getWord(key) {
    return this.translateService.instant(key);
  }
}
