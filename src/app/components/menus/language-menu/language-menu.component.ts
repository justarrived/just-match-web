import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Language} from '../../../models/language/language';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslationService} from '../../../services/translation.service';

@Component({
  selector: 'language-menu',
  styleUrls: ['./language-menu.component.scss'],
  template: `
  <div
    class="ui basic segment language-menu-container"
    *ngIf="isLanguageMenuVisible">
    <div class="ui grid language-menu-logo-container">
        <div class="eight wide column language-menu-logo-container-logo">
            <img
              alt="Just Arrived"
              src="apple-touch-icon.ico"/>
        </div>
        <div class="eight wide column language-menu-logo-container-text">
            <h4>{{'menu.language.title' | translate}}</h4>
        </div>
    </div>

    <div class="language-menu-languages-container">
      <div
        (click)="onSelectLanguage(language)"
        *ngFor="let language of systemLanguages"
        class="ui grid language-menu-language-text-wrapper">
        <div
          [ngClass]="{'language-menu-language-name-active':isActiveSystemLanguage(language)}"
          class="thirteen wide column language-menu-language-name">
          {{language.localName}}
        </div>
        <div class="three wide column language-menu-language-checkmark">
          <i
            *ngIf="isActiveSystemLanguage(language)"
            aria-hidden="true"
            class="fa fa-check">
          </i>
        </div>
      </div>
    </div>

    <div class="language-menu-information-container">
      <p>{{'menu.language.text_1' | translate}}</p>
      <p>{{'menu.language.text_2' | translate}}</p>
    </div>

    <div class="language-menu-credentials-container">
      <p>{{'menu.language.translation_by_probono' | translate}}:</p>
      <img
        alt="Semantix"
        class="language-menu-credentials-container-image"
        src="/assets/images/semantix.png"/>
    </div>

    <div class="language-menu-contributers-wrapper ui equal width grid">
        <div class="column language-menu-contributers-text">
          Farshid Fadaee
        </div>
        <div class="column language-menu-contributers-text">
          Nick Chipperfield
        </div>
        <div class="column language-menu-contributers-text">
          Hans-Erik Täpp
        </div>
    </div>
  </div>
  `
})
export class LanguageMenuComponent implements OnInit {
  @Input() public isLanguageMenuVisible: boolean;
  @Output() isLanguageMenuVisibleChange: EventEmitter<boolean> = new EventEmitter();

  public systemLanguages: Language[];

  constructor (
    private authManager: AuthManager,
    private translationService: TranslationService,
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public ngOnInit() {
    this.systemLanguages = this.systemLanguagesResolver.getSystemLanguages();
  }

  public isActiveSystemLanguage(language: Language): boolean {
    return this.translationService.getSelectedLanguageCode() === language.languageCode;
  }

  public onSelectLanguage(language: Language) {
    this.isLanguageMenuVisible = false;
    this.isLanguageMenuVisibleChange.emit(this.isLanguageMenuVisible);
    this.translationService.setLanguage(language);
    this.authManager.authenticateIfNeeded();
  }
}
