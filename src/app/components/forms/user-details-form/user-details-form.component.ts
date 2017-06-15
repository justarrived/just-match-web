import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserPasswordProxy} from '../../../proxies/user-password/user-password.proxy';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'user-details-form',
  templateUrl: './user-details-form.component.html'
})
export class UserDetailsFormComponent implements OnInit, OnDestroy {
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public JARoutes = JARoutes;
  public loadingSubmit: boolean;
  public passwordForm: FormGroup;
  public settingsForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public user: User;

  private userSubscription: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userPasswordProxy: UserPasswordProxy,
    private userProxy: UserProxy,
    private userResolver: UserResolver,
  ) {
  }

  public ngOnInit(): void {
    this.initUser();
    this.initForm();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      if (user) {
        this.user = user;
        this.initForm();
      }
    });
  }

  private initForm(): void {
    this.initSettingsForm();
    this.initPasswordForm();
  }

  private initSettingsForm(): void {
    this.settingsForm = this.formBuilder.group({
      'bank_account': [this.user.bankAccount],
      'city': [this.user.city],
      'country_of_origin': [this.user.countryOfOrigin],
      'email': [this.user.email, Validators.compose([Validators.required, Validators.email])],
      'first_name': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'gender': [this.user.gender],
      'last_name': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'phone': [this.user.phone, Validators.compose([Validators.required])],
      'ssn': [this.user.ssn],
      'street': [this.user.street],
      'system_language_id': [this.user.systemLanguage.id, Validators.compose([Validators.required])],
      'zip': [this.user.zip],
    });
  }

  private initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      'password': ['', Validators.compose([Validators.minLength(6)])],
      'old_password': ['']
    });
  }

  public ngOnDestroy(): void {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
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

    return this.userProxy.updateUser(this.user.id, {
      'bank_account': this.settingsForm.value.bank_account,
      'city': this.settingsForm.value.city,
      'country_of_origin': this.settingsForm.value.country_of_origin,
      'email': this.settingsForm.value.email,
      'first_name': this.settingsForm.value.first_name,
      'gender': this.settingsForm.value.gender,
      'last_name':this.settingsForm.value.last_name,
      'phone': this.settingsForm.value.phone,
      'ssn': this.settingsForm.value.ssn,
      'street': this.settingsForm.value.street,
      'system_language_id': this.settingsForm.value.system_language_id,
      'zip': this.settingsForm.value.zip,
    }, {
      'include': this.userResolver.defaultIncludeResourcesString,
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
    });
  }
}
