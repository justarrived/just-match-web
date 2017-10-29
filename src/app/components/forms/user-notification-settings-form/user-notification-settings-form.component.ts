import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {NavigationService} from '../../../services/navigation.service';
import {User} from '../../../models/api-models/user/user';
import {UserPasswordProxy} from '../../../proxies/user-password/user-password.proxy';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';
import {BaseComponent} from '../../base.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'user-notification-settings-form',
  template: `
  <form
    (keydown.enter)="$event.preventDefault()"
    (ngSubmit)="submitForm()"
    #form="ngForm"
    class="ui form">

    <basic-loader
      [complete]="!loadingSubmit"
      class="inverted">
    </basic-loader>

    <form-section-title-text
      [text]="'user.settings.form.settings.header' | translate"
      icon="settings">
    </form-section-title-text>

    <system-language-input
      [apiErrors]="apiErrors"
      [control]="formGroup.controls['system_language_id']">
    </system-language-input>

    <user-ignored-notifications-input
      [apiErrors]="apiErrors"
      [control]="formGroup.controls['ignored_notifications']">
    </user-ignored-notifications-input>

    <form-submit-button
      [buttonText]="'user.settings.form.submit.button' | translate"
      [showButton]="!isInModal"
      [submitFail]="submitFail"
      [submitSuccess]="submitSuccess">
    </form-submit-button>
  </form>
  `
})
export class UserNotificationSettingsFormComponent extends BaseComponent {
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean;
  public formGroup: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userProxy: UserProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initForm();
  }

  public userChanged(user: User): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.user) {
      this.formGroup = this.formBuilder.group({
        'ignored_notifications': [this.user.ignoredNotifications],
        'system_language_id': [this.user.systemLanguage.id, Validators.compose([Validators.required])],
      });
    }
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<User> {
    this.submitSuccess = false;
    this.submitFail = false;
    this.loadingSubmit = true;
    this.apiErrors = new ApiErrors([]);

    return this.userProxy.updateUser(this.user.id, {
      'ignored_notifications': [this.formGroup.value.ignored_notifications],
      'system_language_id': this.formGroup.value.system_language_id,
    }, {
      'include': UserResolver.includes,
    })
    .then(user => {
      this.userResolver.setUser(user);
      this.submitSuccess = true;
      this.loadingSubmit = false;
      return user;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      if (this.isInModal) {
        throw errors;
      }
      return null;
    });
  }
}
