import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {deleteElementFromArray} from '../../../utils/array/array.util';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {LanguageProxy} from '../../../proxies/language/language.proxy';
import {some} from 'lodash';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserLanguage} from '../../../models/api-models/user-language/user-language';
import {UserLanguageFactory} from '../../../models/api-models/user-language/user-language';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'languages-input',
  template: `
  <div class="ui form">
    <basic-loader
      [complete]="!loadingLanguage"
      [promise]="languages"
      class="inverted">
    </basic-loader>
    <select-dropdown-input
      (onChange)="onAddLanguage($event)"
      [apiErrors]="apiErrors"
      [control]="languagesControl"
      [data]="languages | async"
      [hint]="hint"
      [label]="'input.languages.label' | translate"
      [placeholder]="'input.languages.placeholder' | translate"
      apiAttribute="language_ids"
      dataItemLabelProperty="translatedText.name"
      dataItemValueProperty="id">
    </select-dropdown-input>
    <basic-text
      [text]="'input.languages.hint' | translate"
      *ngIf="userLanguagesControl.value?.length > 0"
      color="black">
    </basic-text>
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
export class LanguagesInputComponent extends BaseComponent  {
  @Input() public apiErrors: ApiErrors;
  @Input() public hint: string;
  @Input() public languagesControl: FormControl;
  @Input() public languageIds: string[];
  @Input() public userLanguagesControl: FormControl;

  public languages: Promise<Language[]>;
  public loadingLanguage: boolean;

  constructor(
    private languageProxy: LanguageProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
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
      userLanguage.proficiency = 1;

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
