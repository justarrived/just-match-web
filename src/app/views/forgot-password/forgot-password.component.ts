import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserProxy} from '../../services/proxy/user-proxy.service';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';

@Component({
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  private forgotPasswordForm: FormGroup;
  private displayErrorMessage: boolean;

  constructor(
    private userProxy: UserProxy,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
  ) {
    this.forgotPasswordForm = formBuilder.group({
      'email_or_phone': [null, Validators.compose([Validators.required])]
    });
  }

  private submitForm(value: any) {
    this.userProxy.resetPassword(value.email_or_phone)
      .then((result) => {
        this.navigationService.navigate(JARoutes.confirmation, 'password-reset-link-sent')
      })
      .catch((errors) => {
        this.displayErrorMessage = true;
      });
  }
}
