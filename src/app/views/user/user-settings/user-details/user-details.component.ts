import {Component, Input} from '@angular/core';
import {AuthManager} from '../../../../services/auth-manager.service';
import {User} from '../../../../models/user';
import {UserProxy} from '../../../../services/proxy/user-proxy.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input() user: User;

  saveSuccess: boolean;
  errorMessage: string;
  errorCause: string;

  constructor(private authManager: AuthManager, private userProxy: UserProxy) {
  }

  onSubmit() {
    this.saveSuccess = false;
    this.errorMessage = '';
    this.errorCause = '';
    this.userProxy.updateUser(this.user.toJsonObject())
      .then((response) => {
        this.saveSuccess = true;
        return this.authManager.authenticateIfNeeded();
      })
      .catch(errors => {
        this.errorMessage = 'user.settings.form.submit.server.error';
        if (errors.details) {
          if (Object.keys(errors.details)[0]) {
            this.errorCause = Object.keys(errors.details)[0].split('_').join(' ') + ' ' + errors.details[Object.keys(errors.details)[0]];
            this.errorCause = this.errorCause.charAt(0).toUpperCase() + this.errorCause.slice(1);
          } else {
            this.errorCause = 'user.settings.form.submit.server.error.nothing';
          }
        }
      });
  }
}
