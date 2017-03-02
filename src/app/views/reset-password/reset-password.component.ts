import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserProxy} from '../../services/proxy/user-proxy.service';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  errors: any = {};
  JARoutes = JARoutes;
  displayErrorMessage: boolean;
  loadingSubmit: boolean = false;
  oneTimeToken: string;

  constructor(
    private userProxy: UserProxy,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.resetPasswordForm = formBuilder.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.route.params.subscribe(params => {
      this.oneTimeToken = params['token'];
    });
  }

  submitForm(value: any) {
    this.loadingSubmit = true;
    this.displayErrorMessage = false;
    this.userProxy.changePasswordWithToken(value.password, this.oneTimeToken)
      .then((result) => {
        this.navigationService.navigate(JARoutes.confirmation, 'password-reset');
        this.loadingSubmit = false;
      })
      .catch((errors) => {
        this.loadingSubmit = false;
        this.displayErrorMessage = true;
        this.errors = errors.details || errors;
      });
  }

  onEnterKeyUp() {
    if (this.resetPasswordForm.valid) {
      this.submitForm(this.resetPasswordForm.value);
    }
  }
}
