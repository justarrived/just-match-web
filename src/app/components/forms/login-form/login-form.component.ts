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
  apiErrors: ApiErrors = new ApiErrors([]);
  JARoutes = JARoutes;
  loadingSubmit: boolean = false;
  loginForm: FormGroup;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      'email_or_phone': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  submitForm(value: any) {
    this.loadingSubmit = true;
    this.authManager.logUser(value.email_or_phone, value.password)
      .then(result => {
        this.navigationService.navigate(JARoutes.home);
        this.loadingSubmit = false;
      })
      .catch(errors => {
        this.loadingSubmit = false;
        this.apiErrors = errors;
      });
  }

  onEnterKeyUp() {
    if (this.loginForm.valid) {
      this.submitForm(this.loginForm.value);
    }
  }
}
