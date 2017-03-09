import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {TranslationListener} from '../../translation.component';
import {TranslationService} from '../../../services/translation.service';
import {Language} from '../../../models/language/language';
import {LanguageProxy} from '../../../services/proxy/language-proxy.service';

@Component({
  selector: 'system-language-input',
  template: `
    <select-dropdown-input
      [apiErrors]="apiErrors"
      [data]="systemLanguages | async | orderBy: 'translated.name'"
      [control]="control"
      [label]="'input.system.language.label' | translate"
      [placeholder]="'input.system.language.placeholder' | translate"
      apiAttribute="language"
      dataItemLabelProoerty="translated.name"
      dataItemValueProoerty="id">
      <div
        class="ui pointing grey basic label">
        {{'input.system.language.description' | translate}}
      </div>
    </select-dropdown-input>`
})
export class SystemLanguageInputComponent extends TranslationListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;

  public systemLanguages: Promise<Language[]>;

  constructor(
    private languageProxy: LanguageProxy,
    protected translationService: TranslationService
  ) {
    super(translationService);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData() {
    this.systemLanguages = this.languageProxy.getSystemLanguages();
  }
}
