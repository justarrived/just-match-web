import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'language-menu',
  styleUrls: ['./language-menu.component.scss'],
  template: `
  <sm-sidebar
    [options]="options"
    (onHide)="onHide()"
    (onShow)="onShow()"
    #languageSidebar
    class="right vertical inverted">
    <div class="language-menu-container">
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
  </sm-sidebar>
  `
})
export class LanguageMenuComponent implements OnInit {
  @Input() public options: any;
  @Input() public isLanguageMenuVisible: boolean;
  @Output() isLanguageMenuVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('languageSidebar') public languageSidebar;

  public systemLanguages: Language[];

  constructor (
    private userResolver: UserResolver,
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public ngOnInit(): void {
    this.systemLanguages = this.systemLanguagesResolver.getSystemLanguages();
  }

  public onShow(): void {
    this.isLanguageMenuVisible = true;
    this.isLanguageMenuVisibleChange.emit(this.isLanguageMenuVisible);
  }

  public onHide(): void {
    this.isLanguageMenuVisible = false;
    this.isLanguageMenuVisibleChange.emit(this.isLanguageMenuVisible);
  }

  public isActiveSystemLanguage(language: Language): boolean {
    return this.systemLanguagesResolver.getSelectedSystemLanguageCode() === language.languageCode;
  }

  public show(options?: any): void {
    this.isLanguageMenuVisible = true;
    this.isLanguageMenuVisibleChange.emit(this.isLanguageMenuVisible);
    this.languageSidebar.show(options);
  }

  public hide(): void {
    this.isLanguageMenuVisible = false;
    this.isLanguageMenuVisibleChange.emit(this.isLanguageMenuVisible);
    this.languageSidebar.hide();
  }

  public onSelectLanguage(language: Language) {
    this.hide();
    this.systemLanguagesResolver.setSystemLanguage(language);
    if (this.userResolver.getUser()) {
      this.userResolver.reloadUser();
    }
  }
}
