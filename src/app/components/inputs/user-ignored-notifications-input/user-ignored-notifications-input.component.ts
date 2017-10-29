import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserIgnoredNotifications} from '../../../models/api-models/user-ignored-notifications/user-ignored-notifications';
import {UserIgnoredNotificationsProxy} from '../../../proxies/user-ignored-notifications/user-ignored-notifications.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-ignored-notifications-input',
  template: `
    <div class="ui form">
      <basic-loader
        [promise]="notifications"
        class="inverted">
      </basic-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [data]="notifications | async"
        [control]="control"
        [hint]="hint"
        [label]="'input.ignored_notifications.label' | translate"
        [placeholder]="'input.ignored_notifications.placeholder' | translate"
        multiple=true
        apiAttribute="ignored_notifications"
        dataItemLabelProperty="translatedText.description"
        dataItemValueProperty="id">
      </select-dropdown-input>
    </div>`
})
export class UserIgnoredNotificationsInput extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;

  public notifications: Promise<UserIgnoredNotifications[]>;

  public constructor(
    private ignoreNotificationsProxy: UserIgnoredNotificationsProxy,
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
    this.notifications = this.ignoreNotificationsProxy.getUserIgnoredNotifications();
  }
}
