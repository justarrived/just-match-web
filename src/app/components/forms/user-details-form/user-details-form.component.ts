import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'user-details-form',
  templateUrl: './user-details-form.component.html'
})
export class UserDetailsFormComponent implements OnInit, OnDestroy {
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
      this.user = user;
      this.initForm();
    });
  }

  private initForm(): void {
    this.initSettingsForm();
    this.initPasswordForm();
  }

  private initSettingsForm(): void {
    this.settingsForm = this.formBuilder.group({
      'first_name': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'last_name': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'country_of_origin': [this.user.countryOfOriginCode],
      'language_id': [this.user.languageId, Validators.compose([Validators.required])],
      'email': [this.user.email, Validators.compose([Validators.required])],
      'gender': [this.user.gender],
      'phone': [this.user.phone, Validators.compose([Validators.required])],
      'street': [this.user.street],
      'ssn': [this.user.ssn],
      'zip': [this.user.zip],
      'city': [this.user.city],
      'account_clearing_number': [this.user.accountClearingNumber],
      'account_number': [this.user.accountNumber]
    });
  }

  private initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      'password': ['', Validators.compose([Validators.minLength(6)])],
      'old_password': ['']
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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

  public onSubmit(): void {
    this.submitSuccess = false;
    this.submitFail = false;
    this.loadingSubmit = true;
    this.apiErrors = new ApiErrors([]);

    this.userProxy.updateUser(this.user.id, this.settingsForm.value)
    .then(response => {
      if (this.passwordsSupplied()) {

        this.userProxy.changePassword(this.passwordForm.value.password, this.passwordForm.value.old_password)
        .then(response => {

          // has to relogin to be authenticated now that password changed
          this.userResolver.login(this.settingsForm.value.email, this.passwordForm.value.password)
          .then(result => {
            this.userResolver.reloadUser()
            .then(() => {
              this.submitSuccess = true;
              this.loadingSubmit = false;
            });
          })
          .catch(errors => {
            this.handleServerErrors(errors);
            this.navigationService.navigate(JARoutes.login);
          });

        })
        .catch(errors => {
          this.handleServerErrors(errors);
        });

      } else {
        this.userResolver.reloadUser()
        .then(() => {
          this.submitSuccess = true;
          this.loadingSubmit = false;
        });
      }
    })
    .catch(errors => {
      this.handleServerErrors(errors);
    });
  }
}
