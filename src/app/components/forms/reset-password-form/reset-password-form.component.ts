import {ActivatedRoute} from '@angular/router';
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
      this.navigationService.navigate(JARoutes.confirmation, 'password-reset');
      this.loadingSubmit = false;
      this.submitSuccess = true;
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
