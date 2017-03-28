import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {JARoutes} from '../../../routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {UserPasswordProxy} from '../../../proxies/user-password/user-password.proxy';
import {Validators} from '@angular/forms';

@Component({
  selector: 'forgot-password-form',
  styleUrls: ['./forgot-password-form.component.scss'],
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent implements OnInit {
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
      this.navigationService.navigate(JARoutes.confirmation, 'password-reset-link-sent');
    })
    .catch(errors => {
      this.handleServerErrors(errors);
    });
  }
}
