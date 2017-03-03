import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {JARoutes} from '../../../routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'forgot-password-form',
  styleUrls: ['./forgot-password-form.component.scss'],
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent implements OnInit {
  public apiErrors: ApiErrors = new ApiErrors([]);
  public displayErrorMessage: boolean;
  public forgotPasswordForm: FormGroup;
  public JARoutes = JARoutes;
  public loadingSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userProxy: UserProxy
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      'email_or_phone': [null, Validators.compose([Validators.required])]
    });
  }

  public submitForm(value: any) {
    this.displayErrorMessage = false;
    this.loadingSubmit = true;
    this.userProxy.resetPassword(value.email_or_phone)
      .then((result) => {
        this.loadingSubmit = false;
        this.navigationService.navigate(JARoutes.confirmation, 'password-reset-link-sent');
      })
      .catch((errors) => {
        this.apiErrors = errors;
        this.displayErrorMessage = true;
        this.loadingSubmit = false;
      });
  }

  public onEnterKeyUp() {
    if (this.forgotPasswordForm.valid) {
      this.submitForm(this.forgotPasswordForm.value);
    }
  }
}
