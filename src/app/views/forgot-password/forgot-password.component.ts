import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserProxy} from '../../services/proxy/user-proxy.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  displayErrorMessage: boolean;

  constructor(private userProxy: UserProxy, private router: Router, private formBuilder: FormBuilder) {
    this.forgotPasswordForm = formBuilder.group({
      'email_or_phone': [null, Validators.compose([Validators.required])]
    });
  }

  submitForm(value: any) {
    this.userProxy.resetPassword(value.email_or_phone)
      .then(result => this.router.navigate(['/confirmation/password-reset-link-sent']))
      .catch(errors => {
        this.displayErrorMessage = true;
      });
  }
}
