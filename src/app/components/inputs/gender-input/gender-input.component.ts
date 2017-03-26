import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {Gender} from '../../../models/api-models/gender/gender';
import {GenderProxy} from '../../../proxies/gender/gender.proxy';

@Component({
  selector: 'gender-input',
  template: `
    <div class="ui form">
      <sm-loader
        [promise]="genders"
        class="inverted"
        text="{{'component.loading' | translate}}">
      </sm-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [data]="genders | async"
        [control]="control"
        [label]="'input.gender.label' | translate"
        [placeholder]="'input.gender.placeholder' | translate"
        apiAttribute="gender"
        dataItemLabelProoerty="translatedText.name"
        dataItemValueProoerty="id">
      </select-dropdown-input>
    </div>`
})
export class GenderInputComponent extends SystemLanguageListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;

  public genders: Promise<Gender[]>;

  constructor(
    private genderProxy: GenderProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData() {
    this.genders = this.genderProxy.getGenders();
  }
}
