import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {Language} from '../../../models/language/language';
import {LanguageProxy} from '../../../services/proxy/language-proxy.service';

@Component({
  selector: 'system-language-input',
  template: `
    <form
      class="ui form">
      <sm-loader
        [promise]="systemLanguages"
        class="inverted"
        text="{{'component.loading' | translate}}">
      </sm-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [data]="systemLanguages | async"
        [control]="control"
        [label]="'input.system.language.label' | translate"
        [placeholder]="'input.system.language.placeholder' | translate"
        apiAttribute="language"
        dataItemLabelProoerty="translated.name"
        dataItemValueProoerty="id">
        <div style="text-align: center">
          <div class="ui pointing grey basic label">
            {{'input.system.language.description' | translate}}
          </div>
        </div>
      </select-dropdown-input>
    </form>`
})
export class SystemLanguageInputComponent extends SystemLanguageListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;

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
    this.systemLanguages = this.languageProxy.getSystemLanguages();
  }
}
