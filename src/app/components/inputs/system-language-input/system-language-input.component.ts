import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {Language} from '../../../models/api-models/language/language';
import {LanguageProxy} from '../../../proxies/language/language.proxy';

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
        dataItemLabelProoerty="translatedText.name"
        dataItemValueProoerty="id">
      </select-dropdown-input>
    </div>`
})
export class SystemLanguageInputComponent extends SystemLanguageListener implements OnInit {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;

  public systemLanguages: Promise<Language[]>;

  constructor(
    private languageProxy: LanguageProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData() {
    this.systemLanguages = this.languageProxy.getLanguages({
      'filter[system_language]': true
    });
  }
}
