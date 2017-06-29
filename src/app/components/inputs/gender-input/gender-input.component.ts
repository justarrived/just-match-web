import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserGender} from '../../../models/api-models/user-gender/user-gender';
import {UserGenderProxy} from '../../../proxies/user-gender/user-gender.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'gender-input',
  template: `
    <div class="ui form">
      <basic-loader
        [promise]="genders"
        class="inverted">
      </basic-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [data]="genders | async"
        [control]="control"
        [hint]="hint"
        [label]="'input.gender.label' | translate"
        [placeholder]="'input.gender.placeholder' | translate"
        apiAttribute="gender"
        dataItemLabelProperty="translatedText.name"
        dataItemValueProperty="id">
      </select-dropdown-input>
    </div>`
})
export class GenderInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;

  public genders: Promise<UserGender[]>;

  public constructor(
    private genderProxy: UserGenderProxy,
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

  protected loadData() {
    this.genders = this.genderProxy.getUserGenders();
  }
}
