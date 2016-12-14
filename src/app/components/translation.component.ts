import {TranslationService} from '../services/translation.service';

export abstract class TranslationListener {

  constructor(protected translationService: TranslationService) {
    this.translationService.getLanguageChangeEmitter().subscribe(() => {
      this.loadData();
    });
  }

  abstract loadData(): void;
}
