import {Injectable} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";

@Injectable()
export class TranslationService {
  private translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this.translateService = translateService;
    this.translateService.addLangs(['ar', 'en', 'fa', 'fa_AF', 'ku', 'ps', 'sv', 'ti']);
    this.translateService.setDefaultLang('en');
    this.translateService.getTranslation('en').subscribe(() => {}); // to use the fallback language: https://github.com/ocombe/ng2-translate/issues/185
    this.translateService.use('ti');
  }

  public setLanguage(language: string) {
    this.translateService.use(language);
  }
}
