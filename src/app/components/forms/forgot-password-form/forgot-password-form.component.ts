import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserPasswordProxy} from '../../../proxies/user-password/user-password.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'forgot-password-form',
  styleUrls: ['./forgot-password-form.component.scss'],
  template: `
    <form
      (ngSubmit)="submitForm()"
      [formGroup]="forgotPasswordForm"
      class="ui form">
      <basic-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </basic-loader>

      <email-or-phone-input
        [control]="forgotPasswordForm.controls['email_or_phone']"
        [apiErrors]="apiErrors">
      </email-or-phone-input>

      <form-submit-button
        [showButton]="!isInModal"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'contact.form.submit.button' | translate">
        <basic-link
          [text]="'forgot.password.login.link' | translate"
          (click)="loginButonClicked()"
          color="gray"
          hoverColor="pink"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>
      </form-submit-button>
    </form>`
})
export class ForgotPasswordFormComponent extends BaseComponent {
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public forgotPasswordForm: FormGroup;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private navigationService: NavigationService,
    private userPasswordProxy: UserPasswordProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
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
      this.navigationService.navigate(this.JARoutes.login);
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
      if (this.isInModal) {
        throw errors;
      }
    });
  }
}
