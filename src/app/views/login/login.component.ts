import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthManager} from '../../services/auth-manager.service';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private loginForm: FormGroup;
  private errors: any = {};
  private JARoutes = JARoutes;
  private loadingSubmit: boolean = false;

  constructor(
    private authManager: AuthManager,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      'email_or_phone': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  private submitForm(value: any) {
    this.loadingSubmit = true;
    this.authManager.logUser(value.email_or_phone, value.password)
      .then(result => {
        this.navigationService.navigate(JARoutes.home);
        this.loadingSubmit = false;
      })
      .catch(errors => {
        this.loadingSubmit = false;
        this.errors = errors.details || errors;
      });
  }

  private onEnterKeyUp() {
    if (this.loginForm.valid) {
      this.submitForm(this.loginForm.value);
    }
  }
}
