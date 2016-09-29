import {Injectable} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";

@Injectable()
export class TranslationService {
  private translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this.translateService = translateService;
    this.translateService.addLangs(['ar', 'en', 'fa', 'fa_AF', 'ku', 'ps', 'sv', 'ti']);
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.translateService.getBrowserLang());
  }

  public setLanguage(language: string) {
    this.translateService.use(language);
  }
}
