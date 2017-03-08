import {ActivatedRoute} from '@angular/router';
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
  selector: 'reset-password-form',
  templateUrl: './reset-password-form.component.html'
})
export class ResetPasswordFormComponent implements OnInit {
  public apiErrors: ApiErrors = new ApiErrors([]);
  public JARoutes = JARoutes;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public resetPasswordForm: FormGroup;

  constructor(
    private userProxy: UserProxy,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

  public submitForm(value: any) {
    this.loadingSubmit = true;
    this.submitFail = false;
    this.submitSuccess = false;
    this.userProxy.changePasswordWithToken(value.password, value.one_time_token)
      .then((result) => {
        this.navigationService.navigate(JARoutes.confirmation, 'password-reset');
        this.loadingSubmit = false;
        this.submitSuccess = true;
      })
      .catch((errors) => {
        this.apiErrors = errors;
        this.submitFail = true;
        this.loadingSubmit = false;
      });
  }

  public onEnterKeyUp() {
    if (this.resetPasswordForm.valid) {
      this.submitForm(this.resetPasswordForm.value);
    }
  }
}
