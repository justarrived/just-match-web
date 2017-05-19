import {ActivatedRoute} from '@angular/router';
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
  selector: 'reset-password-form',
  styleUrls: ['./reset-password-form.component.scss'],
  template: `
    <form
      (ngSubmit)="submitForm()"
      [formGroup]="resetPasswordForm"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </sm-loader>

      <password-input
        [control]="resetPasswordForm.controls['password']"
        [apiErrors]="apiErrors">
      </password-input>

      <form-submit-button
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'reset.password.form.submit.button' | translate">
        <input-errors
          [apiErrors]="apiErrors"
          [control]="resetPasswordForm.controls['one_time_token']"
          apiAttribute="one_time_token">
        </input-errors>
        <basic-link
          [text]="'reset.password.form.forgot.password.link' | translate"
          (click)="onForgotPasswordButtonClick()"
          color="gray"
          hoverColor="pink"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>
        <basic-link
          [text]="'reset.password.form.login.link' | translate"
          (click)="onLoginButtonClick()"
          color="gray"
          hoverColor="pink"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-link>
      </form-submit-button>
    </form>`
})
export class ResetPasswordFormComponent implements OnInit {
  public apiErrors: ApiErrors = new ApiErrors([]);
  public JARoutes = JARoutes;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public resetPasswordForm: FormGroup;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private userPasswordProxy: UserPasswordProxy
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.initToken();
  }

  private initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'one_time_token': ['', Validators.compose([Validators.required])]
    });
  }

  private initToken() {
    this.route.params.subscribe(params => {
      this.resetPasswordForm.controls['one_time_token'].setValue(params['token']);
    });
  }

  public onForgotPasswordButtonClick(): void {
    this.navigationService.navigate(JARoutes.forgotPassword);
  }

  public onLoginButtonClick(): void {
    this.navigationService.navigate(JARoutes.login);
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<any> {
    this.loadingSubmit = true;
    this.submitFail = false;
    this.submitSuccess = false;

    return this.userPasswordProxy.updateUserPassword({
      'one_time_token': this.resetPasswordForm.value.one_time_token,
      'password': this.resetPasswordForm.value.password,
    })
    .then(result => {
      this.loadingSubmit = false;
      this.submitSuccess = true;
      this.modalService.showModal('passwordChangedModalComponent', false, false, 1);
      return result;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
    });
  }

  public onEnterKeyUp() {
    if (this.resetPasswordForm.valid) {
      this.submitForm();
    }
  }
}
