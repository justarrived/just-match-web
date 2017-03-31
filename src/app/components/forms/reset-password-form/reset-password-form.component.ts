import {ActivatedRoute} from '@angular/router';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {PasswordChangedModalComponent} from '../../modals/password-changed-modal/password-changed-modal.component';
import {UserPasswordProxy} from '../../../proxies/user-password/user-password.proxy';
import {Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'reset-password-form',
  template: `
    <form
      (ngSubmit)="submitForm(resetPasswordForm.value)"
      [formGroup]="resetPasswordForm"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        class="inverted"
        text="{{'component.loading' | translate}}">
      </sm-loader>

      <password-changed-modal
        #passwordChangedModalComponent>
      </password-changed-modal>

      <password-input
        [control]="resetPasswordForm.controls['password']"
        [apiErrors]="apiErrors">
      </password-input>

      <form-submit-button
        [showButton]="showSubmitButton"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'reset.password.form.submit.button' | translate">
        <input-errors
          [apiErrors]="apiErrors"
          [control]="resetPasswordForm.controls['one_time_token']"
          apiAttribute="one_time_token">
        </input-errors>
      </form-submit-button>
    </form>`
})
export class ResetPasswordFormComponent implements OnInit {
  @Input() public showSubmitButton: boolean = true;
  @ViewChild('passwordChangedModalComponent') public passwordChangedModalComponent: PasswordChangedModalComponent;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public JARoutes = JARoutes;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public resetPasswordForm: FormGroup;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
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

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(value: any) {
    this.loadingSubmit = true;
    this.submitFail = false;
    this.submitSuccess = false;
    this.userPasswordProxy.updateUserPassword({
      'one_time_token': value.one_time_token,
      'password': value.password,
    })
    .then(result => {
      this.loadingSubmit = false;
      this.submitSuccess = true;
      this.passwordChangedModalComponent.show();
    })
    .catch(errors => {
      this.handleServerErrors(errors);
    });
  }

  public onEnterKeyUp() {
    if (this.resetPasswordForm.valid) {
      this.submitForm(this.resetPasswordForm.value);
    }
  }
}
