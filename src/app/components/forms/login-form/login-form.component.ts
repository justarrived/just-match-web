import {AnalyticsActions} from '../../../services/analytics.service';
import {AnalyticsService} from '../../../services/analytics.service';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {EventEmitter} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoggedInGuard} from '../../../guards/logged-in/logged-in.guard';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {ModalService} from '../../../services/modal.service';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'login-form',
  styleUrls: ['./login-form.component.scss'],
  template: `
    <form
      (ngSubmit)="submitForm()"
      [formGroup]="loginForm"
      class="ui form">
      <basic-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </basic-loader>

      <email-or-phone-input
        [control]="loginForm.controls['email_or_phone']"
        [apiErrors]="apiErrors">
      </email-or-phone-input>

      <password-input
        [control]="loginForm.controls['password']"
        [apiErrors]="apiErrors">
      </password-input>

      <form-submit-button
        [buttonText]="'login.form.submit.button' | translate"
        [showButton]="!isInModal"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess">
        <basic-link
          [text]="'login.form.forgot.password.link' | translate"
          (click)="onForgotPasswordButtonClick()"
          color="gray"
          hoverColor="pink"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>
        <basic-link
          [text]="'login.form.register.link' | translate"
          (click)="onRegisterButtonClick()"
          color="gray"
          hoverColor="pink"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>
      </form-submit-button>
    </form>`
})
export class LoginFormComponent extends BaseComponent {
  @Input() public isInModal: boolean = false;
  @Input() public navigateOnSubmit: boolean = true;
  @Input('emailOrPhone')
  public set emailOrPhone(emailOrPhone: string) {
    this.phoneOrEmail = emailOrPhone;
    if (this.loginForm) {
      this.loginForm.controls.email_or_phone.setValue(emailOrPhone);
    }
  }

  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean;
  public loginForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public phoneOrEmail: string;

  constructor(
    private analyticsService: AnalyticsService,
    private changeDetector: ChangeDetectorRef,
    private dataStoreService: DataStoreService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      'email_or_phone': [this.phoneOrEmail, Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  public onForgotPasswordButtonClick(): void {
    if (this.isInModal) {
      this.modalService.showModal('forgotPasswordModalComponent', false, false, 400);
    } else {
      this.navigationService.navigate(this.JARoutes.forgotPassword);
    }
  }

  public onRegisterButtonClick(): void {
    if (this.isInModal) {
      this.modalService.showModal('registerModalComponent', this.navigateOnSubmit, false, 400);
    } else {
      this.navigationService.navigate(this.JARoutes.registerUser);
    }
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<User> {
    this.submitFail = false;
    this.submitSuccess = false;
    this.loadingSubmit = true;

    this.analyticsService.publishEvent(AnalyticsActions.LoginTry);

    return this.userResolver.login(this.loginForm.value.email_or_phone, this.loginForm.value.password)
    .then(user => {
      this.analyticsService.publishEvent(AnalyticsActions.LoginSuccess, {
        user: user.id
      });

      if (this.navigateOnSubmit) {
        const redirectUrl = this.dataStoreService.getFromMemory(LoggedInGuard.redirectToUrlAfterLoginKey);
        if (redirectUrl) {
          this.dataStoreService.removeFromMemory(LoggedInGuard.redirectToUrlAfterLoginKey);
          this.navigationService.navigateToUrl(redirectUrl);
        } else {
          this.navigationService.navigate(this.JARoutes.home);
        }
      }
      this.loadingSubmit = false;
      this.submitSuccess = true;
      return user;
    })
    .catch(errors => {
      this.handleServerErrors(errors);

      this.analyticsService.publishEvent(AnalyticsActions.LoginFail);

      if (this.isInModal) {
        throw errors;
      }
      return null;
    });
  }
}
