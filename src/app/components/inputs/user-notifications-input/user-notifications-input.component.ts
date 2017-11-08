import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserNotification} from '../../../models/api-models/user-notification/user-notification';
import {UserNotificationProxy} from '../../../proxies/user-notification/user-notification.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-notifications-input',
  template: `
    <div class="ui form">
      <basic-loader
        [promise]="notifications"
        class="inverted">
      </basic-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [control]="control"
        [data]="notifications | async"
        [hint]="hint"
        [label]="'input.ignored_notifications.label' | translate"
        [multipleResults]="multipleResults"
        [placeholder]="'input.ignored_notifications.placeholder' | translate"
        apiAttribute="ignored_notifications"
        dataItemLabelProperty="translatedText.description"
        dataItemValueProperty="id"
        multiple="true">
      </select-dropdown-input>
    </div>`
})
export class UserNotificationsInput extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
  @Input() public multipleResults: any[] = [];

  public notifications: Promise<UserNotification[]>;

  public constructor(
    private userNotificationProxy: UserNotificationProxy,
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
    const userId = this.userResolver.getUser().id;
    this.notifications = this.userNotificationProxy.getUserNotifications(userId);
  }
}
