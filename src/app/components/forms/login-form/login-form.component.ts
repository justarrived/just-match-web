import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {ModalService} from '../../../services/modal.service';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
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
export class LoginFormComponent implements OnInit  {
  @Input() public isInModal: boolean = false;
  @Input() public navigateToHome: boolean = true;
  @Input('emailOrPhone')
  public set emailOrPhone(emailOrPhone: string) {
    this.phoneOrEmail = emailOrPhone;
    if (this.loginForm) {
      this.loginForm.controls.email_or_phone.setValue(emailOrPhone);
    }
  }

  public apiErrors: ApiErrors = new ApiErrors([]);
  public JARoutes = JARoutes;
  public loadingSubmit: boolean;
  public loginForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public phoneOrEmail: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private navigationService: NavigationService,
    private userResolver: UserResolver,
  ) {
  }

  public ngOnInit(): void {
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
      this.modalService.showModal('registerModalComponent', this.navigateToHome, false, 400);
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

    return this.userResolver.login(this.loginForm.value.email_or_phone, this.loginForm.value.password)
    .then(user => {
      if (this.navigateToHome) {
        this.navigationService.navigate(this.JARoutes.home);
      }
      this.loadingSubmit = false;
      this.submitSuccess = true;
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
