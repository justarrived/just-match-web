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
  error_message: string;

  constructor(private authManager: AuthManager, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    })
  }

  submitForm(value: any) {
    this.authManager.logUser(value.email, value.password)
      .then(result => this.router.navigate(['/home']))
      .catch(errors => {
        if (errors.details) {
          this.error_message = errors.details.password;
        } else {
          console.log(errors);
        }
      });
  }
}
