import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {PasswordResetLinkSentModalComponent} from '../../modals/password-reset-link-sent-modal/password-reset-link-sent-modal.component';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {UserPasswordProxy} from '../../../proxies/user-password/user-password.proxy';
import {Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'forgot-password-form',
  styleUrls: ['./forgot-password-form.component.scss'],
  template: `
    <form
      (ngSubmit)="submitForm(forgotPasswordForm.value)"
      [formGroup]="forgotPasswordForm"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </sm-loader>

      <password-reset-link-sent-modal
        #passwordResetLinkSentModalComponent>
      </password-reset-link-sent-modal>

      <email-or-phone-input
        [control]="forgotPasswordForm.controls['email_or_phone']"
        [apiErrors]="apiErrors">
      </email-or-phone-input>

      <form-submit-button
        [showButton]="showSubmitButton"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'contact.form.submit.button' | translate">
        <div>
          <a
            class="forgot-password-form-link"
            routerLink="{{JARoutes.login.url()}}">
            {{'forgot.password.login.link' | translate}}
          </a>
        </div>
      </form-submit-button>
    </form>`
})
export class ForgotPasswordFormComponent implements OnInit {
  @Input() public showSubmitButton: boolean = true;
  @ViewChild('passwordResetLinkSentModalComponent') public passwordResetLinkSentModalComponent: PasswordResetLinkSentModalComponent;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public forgotPasswordForm: FormGroup;
  public JARoutes = JARoutes;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userPasswordProxy: UserPasswordProxy
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      'email_or_phone': ['']
    });
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(value: any) {
    this.submitFail = false;
    this.submitSuccess = false;
    this.loadingSubmit = true;

    this.userPasswordProxy.sendUserPasswordResetLink({
      'email_or_phone': value.email_or_phone
    })
    .then(result => {
      this.submitSuccess = true;
      this.loadingSubmit = false;
      this.passwordResetLinkSentModalComponent.show();
    })
    .catch(errors => {
      this.handleServerErrors(errors);
    });
  }
}
