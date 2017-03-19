import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {UserStatus} from '../../../models/user/user-status';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'status-input',
  template: `
    <div class="ui form">
      <sm-loader
        [promise]="statuses"
        class="inverted"
        text="{{'component.loading' | translate}}">
      </sm-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [control]="control"
        [data]="statuses | async"
        [label]="'input.status.label' | translate"
        [placeholder]="'input.status.placeholder' | translate"
        apiAttribute="current_status"
        dataItemLabelProoerty="name"
        dataItemValueProoerty="id">
      </select-dropdown-input>
    </div>`
})
export class StatusInputComponent extends SystemLanguageListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;

  public statuses: Promise<UserStatus[]>;

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
    this.statuses = this.userProxy.getStatuses();
  }
}
