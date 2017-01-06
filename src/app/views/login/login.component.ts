import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthManager} from '../../services/auth-manager.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private authManager: AuthManager, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      'email_or_phone': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  submitForm(value: any) {
    this.authManager.logUser(value.email_or_phone, value.password)
      .then(result => this.router.navigate(['/home']))
      .catch(errors => {
        if (errors.details) {
          this.errorMessage = errors.details.password;
        } else {
          throw errors;
        }
      });
  }
}
