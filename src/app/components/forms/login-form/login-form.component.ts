import {ApiErrors} from '../../../models/api-errors';
import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {JARoutes} from '../../../routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit  {
  public apiErrors: ApiErrors = new ApiErrors([]);
  public JARoutes = JARoutes;
  public loadingSubmit: boolean;
  public loginForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      'email_or_phone': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  public submitForm(value: any) {
    this.submitFail = false;
    this.submitSuccess = false;
    this.loadingSubmit = true;
    this.authManager.logUser(value.email_or_phone, value.password)
      .then(result => {
        this.navigationService.navigate(JARoutes.home);
        this.loadingSubmit = false;
        this.submitSuccess = true;
      })
      .catch(errors => {
        this.loadingSubmit = false;
        this.submitFail = true;
        this.apiErrors = errors;
      });
  }

  public onEnterKeyUp() {
    if (this.loginForm.valid) {
      this.submitForm(this.loginForm.value);
    }
  }
}
