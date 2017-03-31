import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {deleteElementFromArray} from '../../../utils/array/array.util';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {LanguageProxy} from '../../../proxies/language/language.proxy';
import {OnInit} from '@angular/core';
import {some} from 'lodash';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserLanguage} from '../../../models/api-models/user-language/user-language';
import {UserLanguageFactory} from '../../../models/api-models/user-language/user-language';

@Component({
  selector: 'languages-input',
  template: `
  <div class="ui form">
    <sm-loader
      [complete]="!loadingLanguage"
      [promise]="languages"
      class="inverted"
      text="{{'component.loading' | translate}}">
    </sm-loader>
    <select-dropdown-input
      (onChange)="onAddLanguage($event)"
      [apiErrors]="apiErrors"
      [control]="languagesControl"
      [data]="languages | async"
      [hint]="hint"
      [label]="'input.languages.label' | translate"
      [placeholder]="'input.languages.placeholder' | translate"
      apiAttribute="language_ids"
      dataItemLabelProoerty="translatedText.name"
      dataItemValueProoerty="id">
    </select-dropdown-input>
    <div *ngFor="let userLanguage of userLanguagesControl.value">
      <language-proficiency-input
        (onDelete)="onRemoveUserLanguage(userLanguage)"
        (onRate)="onProficiencyChange($event, userLanguage)"
        [initialRating]="userLanguage.proficiency"
        [label]="userLanguage.language.translatedText.name">
      </language-proficiency-input>
    </div>
  </div>`
})
export class LanguagesInputComponent extends SystemLanguageListener implements OnInit {
  @Input() public apiErrors: ApiErrors;
  @Input() public hint: string;
  @Input() public languagesControl: FormControl;
  @Input() public languageIds: string[];
  @Input() public userLanguagesControl: FormControl;

  public languages: Promise<Language[]>;
  public loadingLanguage: boolean;

  constructor(
    private languageProxy: LanguageProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.languages = this.languageProxy.getLanguages({
      'page[size]': 300,
      'sort': 'en_name',
      'filter[id]': (this.languageIds ? this.languageIds.join(',') : null),
    });
  }

  public onRemoveUserLanguage(userLanguage): void {
    deleteElementFromArray(this.userLanguagesControl.value, userLanguage);
  }

  public onProficiencyChange(value, userLanguage): void {
    userLanguage.proficiency = value;
  }

  public onAddLanguage(languageId): void {
    if (languageId && !some(this.userLanguagesControl.value, { language: {id: languageId} })) {
      const userLanguage = UserLanguageFactory.createUserLanguage({});
      this.loadingLanguage = true;
      this.languageProxy.getLanguage(languageId)
      .then(language => {
        userLanguage.language = language;
        this.userLanguagesControl.value.push(userLanguage);
        this.loadingLanguage = false;
      })
      .catch(errors => {
        this.loadingLanguage = false;
      });
    }
  }
}
