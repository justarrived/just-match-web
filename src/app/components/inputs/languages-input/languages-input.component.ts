import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {deleteElementFromArray} from '../../../utils/array-util';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/language/language';
import {LanguageProxy} from '../../../services/proxy/language-proxy.service';
import {OnInit} from '@angular/core';
import {some} from 'lodash';
import {TranslationListener} from '../../translation.component';
import {TranslationService} from '../../../services/translation.service';
import {UserLanguage} from '../../../models/user/user-language';

@Component({
  selector: 'languages-input',
  template: `
  <form
    class="ui form">
    <sm-loader
      [complete]="!loadingLanguage"
      class="inverted"
      text="{{'component.loading' | translate}}">
    </sm-loader>
    <select-dropdown-input
      (onChange)="onAddLanguage($event)"
      [apiErrors]="apiErrors"
      [control]="languagesControl"
      [data]="languages | async"
      [label]="'input.languages.label' | translate"
      [placeholder]="'input.languages.placeholder' | translate"
      apiAttribute="language_ids"
      dataItemLabelProoerty="translated.name"
      dataItemValueProoerty="id">
    </select-dropdown-input>
    <div *ngFor="let userLanguage of userLanguagesControl.value">
      <language-proficiency-input
        (onDelete)="onRemoveUserLanguage(userLanguage)"
        (onRate)="onProficiencyChange($event, userLanguage)"
        [initialRating]="userLanguage.proficiency"
        [label]="userLanguage.language.translated.name">
      </language-proficiency-input>
    </div>
  </form>`
})
export class LanguagesInputComponent extends TranslationListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() languagesControl: FormControl;
  @Input() userLanguagesControl: FormControl;

  public languages: Promise<Language[]>;
  public loadingLanguage: boolean;

  constructor(
    private languageProxy: LanguageProxy,
    protected translationService: TranslationService
  ) {
    super(translationService);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.languages = this.languageProxy.getLanguages().then();
  }

  public onRemoveUserLanguage(userLanguage): void {
    deleteElementFromArray(this.userLanguagesControl.value, userLanguage);
  }

  public onProficiencyChange(value, userLanguage): void {
    userLanguage.proficiency = value;
  }

  public onAddLanguage(languageId): void {
    if (languageId && !some(this.userLanguagesControl.value, { language: {id: languageId} })) {
      const userLanguage = new UserLanguage({});
      this.loadingLanguage = true;
      this.languageProxy.getLanguage(languageId).then((language) => {
        userLanguage.language = language;
        this.userLanguagesControl.value.push(userLanguage);
        this.loadingLanguage = false;
      }).catch(errors => {
        this.loadingLanguage = false;
      });
    }
  }
}
