import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {ModalService} from '../../../services/modal.service';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {UserPasswordProxy} from '../../../proxies/user-password/user-password.proxy';
import {Validators} from '@angular/forms';

@Component({
  selector: 'forgot-password-form',
  styleUrls: ['./forgot-password-form.component.scss'],
  template: `
    <form
      (ngSubmit)="submitForm()"
      [formGroup]="forgotPasswordForm"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </sm-loader>

      <email-or-phone-input
        [control]="forgotPasswordForm.controls['email_or_phone']"
        [apiErrors]="apiErrors">
      </email-or-phone-input>

      <form-submit-button
        [showButton]="!isInModal"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'contact.form.submit.button' | translate">
        <div>
          <a
            (click)="loginButonClicked()"
            class="forgot-password-form-link">
            {{'forgot.password.login.link' | translate}}
          </a>
        </div>
      </form-submit-button>
    </form>`
})
export class ForgotPasswordFormComponent implements OnInit {
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public forgotPasswordForm: FormGroup;
  public JARoutes = JARoutes;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
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

  public loginButonClicked() {
    if (this.isInModal) {
      this.modalService.showModal('loginModalComponent', false, false, 400);
    } else {
      this.navigationService.navigate(JARoutes.login);
    }
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<any> {
    this.submitFail = false;
    this.submitSuccess = false;
    this.loadingSubmit = true;

    return this.userPasswordProxy.sendUserPasswordResetLink({
      'email_or_phone': this.forgotPasswordForm.value.email_or_phone
    })
    .then(result => {
      this.submitSuccess = true;
      this.loadingSubmit = false;
      this.modalService.showModal('passwordResetLinkSentModalComponent', false, false, this.isInModal ? 400 : 1);
      return result;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      throw errors;
    });
  }
}
