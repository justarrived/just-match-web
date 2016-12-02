import {Component} from '@angular/core';
import {AuthManager} from '../../services/auth-manager.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private authManager: AuthManager, private router: Router) { }

  onLoginButtonClick() {
    this.authManager.logUser(this.email, this.password).then(result => this.router.navigate(['/home']));
  }

}
