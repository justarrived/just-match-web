import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {UserStatus} from '../../../models/api-models/user-status/user-status';
import {UserStatusProxy} from '../../../proxies/user-status/user-status.proxy';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'status-input',
  template: `
    <div class="ui form">
      <sm-loader
        [promise]="statuses"
        class="inverted">
      </sm-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [control]="control"
        [data]="statuses | async"
        [hint]="hint"
        [label]="'input.status.label' | translate"
        [placeholder]="'input.status.placeholder' | translate"
        apiAttribute="current_status"
        dataItemLabelProoerty="translatedText.name"
        dataItemValueProoerty="id">
      </select-dropdown-input>
    </div>`
})
export class StatusInputComponent extends SystemLanguageListener implements OnInit {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;

  public statuses: Promise<UserStatus[]>;

  constructor(
    private userStatusProxy: UserStatusProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData() {
    this.statuses = this.userStatusProxy.getUserStatuses();
  }
}
