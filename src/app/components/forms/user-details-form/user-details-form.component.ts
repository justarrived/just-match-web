import {AnalyticsActions} from '../../../services/analytics.service';
import {AnalyticsService} from '../../../services/analytics.service';
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
  selector: 'user-details-form',
  templateUrl: './user-details-form.component.html'
})
export class UserDetailsFormComponent extends BaseComponent {
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public ignoredNotificationsResults: any[] = [];
  public loadingSubmit: boolean;
  public passwordForm: FormGroup;
  public settingsForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;

  public constructor(
    private analyticsService: AnalyticsService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userPasswordProxy: UserPasswordProxy,
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
    this.initSettingsForm();
    this.initPasswordForm();
  }

  private initSettingsForm(): void {
    if (this.user) {
      this.settingsForm = this.formBuilder.group({
        'bank_account': [this.user.bankAccount],
        'city': [this.user.city],
        'country_of_origin': [this.user.countryOfOrigin],
        'email': [this.user.email, Validators.compose([Validators.required, Validators.email])],
        'first_name': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
        'gender': [this.user.gender],
        'ignored_notifications': [this.user.ignoredNotifications],
        'ignored_notifications_result': [],
        'last_name': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
        'phone': [this.user.phone, Validators.compose([Validators.required])],
        'ssn': [this.user.ssn],
        'street': [this.user.street],
        'system_language_id': [this.user.systemLanguage.id, Validators.compose([Validators.required])],
        'zip': [this.user.zip],
      });
    }
  }

  private initPasswordForm(): void {
    if (this.user) {
      this.passwordForm = this.formBuilder.group({
        'password': ['', Validators.compose([Validators.minLength(6)])],
        'old_password': ['']
      });
    }
  }

  public passwordsSupplied(): boolean {
    return !!this.passwordForm.value.password;
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

    this.analyticsService.publishEvent(AnalyticsActions.UpdateUserTry);

    return this.userProxy.updateUser(this.user.id, {
      'bank_account': this.settingsForm.value.bank_account,
      'city': this.settingsForm.value.city,
      'country_of_origin': this.settingsForm.value.country_of_origin,
      'email': this.settingsForm.value.email,
      'first_name': this.settingsForm.value.first_name,
      'gender': this.settingsForm.value.gender,
      'ignored_notifications': this.ignoredNotificationsResults,
      'last_name':this.settingsForm.value.last_name,
      'phone': this.settingsForm.value.phone,
      'ssn': this.settingsForm.value.ssn,
      'street': this.settingsForm.value.street,
      'system_language_id': this.settingsForm.value.system_language_id,
      'zip': this.settingsForm.value.zip,
    }, {
      'include': UserResolver.includes,
    })
    .then(user => {
      if (this.passwordsSupplied()) {
        return this.userPasswordProxy.updateUserPassword({
          'old_password': this.passwordForm.value.old_password,
          'password': this.passwordForm.value.password,
        })
        .then(response => {
          // has to relogin to be authenticated now that password changed
          return this.userResolver.login(this.settingsForm.value.email, this.passwordForm.value.password);
        }).catch(errors => {
          this.navigationService.navigate(this.JARoutes.login);
          throw errors;
        });
      } else {
        return user;
      }
    })
    .then(user => {
      this.analyticsService.publishEvent(AnalyticsActions.UpdateUserSuccess);

      this.userResolver.setUser(user);
      this.submitSuccess = true;
      this.loadingSubmit = false;
      return user;
    })
    .catch(errors => {
      this.handleServerErrors(errors);

      this.analyticsService.publishEvent(AnalyticsActions.UpdateUserFail);

      if (this.isInModal) {
        throw errors;
      }
      return null;
    });
  }
}
