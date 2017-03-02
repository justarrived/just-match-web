import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserProxy} from '../../services/proxy/user-proxy.service';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';
import {ApiErrors} from '../../models/api-errors';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  apiErrors: ApiErrors = new ApiErrors([]);
  JARoutes = JARoutes;
  displayErrorMessage: boolean;
  loadingSubmit: boolean = false;

  constructor(
    private userProxy: UserProxy,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
  ) {
    this.forgotPasswordForm = formBuilder.group({
      'email_or_phone': [null, Validators.compose([Validators.required])]
    });
  }

  submitForm(value: any) {
    this.loadingSubmit = true;
    this.displayErrorMessage = false;
    this.userProxy.resetPassword(value.email_or_phone)
      .then((result) => {
        this.navigationService.navigate(JARoutes.confirmation, 'password-reset-link-sent');
        this.loadingSubmit = false;
      })
      .catch((errors) => {
        this.loadingSubmit = false;
        this.displayErrorMessage = true;
        this.apiErrors = errors;
      });
  }

  onEnterKeyUp() {
    if (this.forgotPasswordForm.valid) {
      this.submitForm(this.forgotPasswordForm.value);
    }
  }
}
