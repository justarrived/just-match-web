import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserGender} from '../../../models/user/user-gender';
import {UserProxy} from '../../../services/proxy/user-proxy.service';

@Component({
  selector: 'gender-input',
  template: `
    <form
      class="ui form">
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
        dataItemLabelProoerty="translated.name"
        dataItemValueProoerty="id">
      </select-dropdown-input>
    </form>`
})
export class GenderInputComponent extends SystemLanguageListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;

  public genders: Promise<UserGender[]>;

  constructor(
    private userProxy: UserProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData() {
    this.genders = this.userProxy.getGenders();
  }
}
