import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'language-menu',
  styleUrls: ['./language-menu.component.scss'],
  template: `
    <div class="language-menu-container" *ngIf="isLanguageMenuVisible">
      <div class="ui grid language-menu-logo-container">
        <div class="eight wide column language-menu-logo-container-logo">
          <img
            alt="Just Arrived"
            src="apple-touch-icon.ico"/>
        </div>
        <div class="eight wide column language-menu-logo-container-text">
          <basic-title-text
            [text]="'menu.language.title' | translate"
            fontSize="small"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-title-text>
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
            <basic-link
              [text]="language.localName"
              [color]="isActiveSystemLanguage(language) ? 'pink' : 'gray'"
              hoverColor="pink"
              marginBottom="0"
              marginTop="0"
              textAlignmentLtr="left"
              textAlignmentRtl="left">
            </basic-link>
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
        <basic-text
          [text]="'menu.language.text_1' | translate"
          fontSize="small"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
        <basic-text
          [text]="'menu.language.text_2' | translate"
          fontSize="small"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
      </div>

      <div class="language-menu-credentials-container">
        <basic-text
          [text]="'menu.language.translation_by_probono' | translate"
          fontSize="small"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
        <img
          alt="Semantix"
          class="language-menu-credentials-container-image"
          src="/assets/images/semantix.png"/>
      </div>
    </div>
  `
})
export class LanguageMenuComponent extends BaseComponent {
  @Input() public isLanguageMenuVisible: boolean;
  @Output() isLanguageMenuVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public systemLanguages: Language[];

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.systemLanguages = this.systemLanguagesResolver.getSystemLanguages();
  }

  public isActiveSystemLanguage(language: Language): boolean {
    return this.systemLanguage.languageCode === language.languageCode;
  }

  public onSelectLanguage(language: Language) {
    this.isLanguageMenuVisible = false;
    this.isLanguageMenuVisibleChange.emit(this.isLanguageMenuVisible);
    this.systemLanguagesResolver.setSystemLanguage(language);
    if (this.user) {
      this.userResolver.reloadUser();
    }
  }
}
