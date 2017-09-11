import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {JobDigestNotificationFrequency} from '../../../models/api-models/job-digest-notification-frequency/job-digest-notification-frequency';
import {JobDigestNotificationFrequencyProxy} from '../../../proxies/job-digest-notification-frequency/job-digest-notification-frequency.proxy';

@Component({
  selector: 'job-digest-notification-frequency-input',
  template: `
    <div class="ui form">
      <basic-loader
        [promise]="frequencies"
        class="inverted">
      </basic-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [control]="control"
        [data]="frequencies | async"
        [hint]="hint"
        [label]="'input.job.digest.notification.frequency.label' | translate"
        [placeholder]="'input.job.digest.notification.frequency.placeholder' | translate"
        apiAttribute="notification_frequency"
        dataItemLabelProperty="translatedText.name"
        dataItemValueProperty="id">
      </select-dropdown-input>
    </div>`
})
export class JobDigestNotificationFrequencyInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;

  public frequencies: Promise<JobDigestNotificationFrequency[]>;

  public constructor(
    private jobDigestNotificationFrequencyProxy: JobDigestNotificationFrequencyProxy,
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
    this.frequencies = this.jobDigestNotificationFrequencyProxy.getJobDigestNotificationFrequencies();
  }
}
