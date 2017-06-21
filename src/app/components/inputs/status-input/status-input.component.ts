import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {UserStatus} from '../../../models/api-models/user-status/user-status';
import {UserStatusProxy} from '../../../proxies/user-status/user-status.proxy';

@Component({
  selector: 'status-input',
  template: `
    <div class="ui form">
      <basic-loader
        [promise]="statuses"
        class="inverted">
      </basic-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [control]="control"
        [data]="statuses | async"
        [hint]="hint"
        [label]="'input.status.label' | translate"
        [placeholder]="'input.status.placeholder' | translate"
        apiAttribute="current_status"
        dataItemLabelProperty="translatedText.name"
        dataItemValueProperty="id">
      </select-dropdown-input>
    </div>`
})
export class StatusInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;

  public statuses: Promise<UserStatus[]>;

  public constructor(
    private userStatusProxy: UserStatusProxy,
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
    this.statuses = this.userStatusProxy.getUserStatuses();
  }
}
