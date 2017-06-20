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
      <div class="language-menu-logo-container">
        <div class="language-menu-logo-container-logo">
          <img
            alt="Just Arrived"
            src="apple-touch-icon.ico"/>
        </div>
        <div class="language-menu-logo-container-text">
          <basic-title-text
            [text]="'menu.language.title' | translate"
            color="white"
            marginTop="0"
            marginBottom="0"
            fontSize="small"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-title-text>
        </div>
      </div>

      <basic-link
        *ngFor="let language of systemLanguages"
        (click)="onSelectLanguage(language)"
        [text]="language.localName"
        [color]="isActiveSystemLanguage(language) ? 'pink' : 'white'"
        fontSize="large"
        hoverColor="pink"
        marginBottom="0"
        marginTop="20px"
        textAlignmentLtr="left"
        textAlignmentRtl="left">
      </basic-link>
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
