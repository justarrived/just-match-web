import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {LanguageProxy} from '../../../proxies/language/language.proxy';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'system-language-input',
  template: `
    <div class="ui form">
      <basic-loader
        [promise]="systemLanguages"
        class="inverted">
      </basic-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [data]="systemLanguages | async"
        [control]="control"
        [label]="'input.system.language.label' | translate"
        [hint]="'input.system.language.description' | translate"
        [placeholder]="'input.system.language.placeholder' | translate"
        apiAttribute="system_language"
        dataItemLabelProperty="translatedText.name"
        dataItemValueProperty="id">
      </select-dropdown-input>
    </div>`
})
export class SystemLanguageInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;

  public systemLanguages: Promise<Language[]>;

  public constructor(
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

  protected loadData() {
    this.systemLanguages = this.languageProxy.getLanguages({
      'filter[system_language]': true
    });
  }
}
