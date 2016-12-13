import {Component, Input} from '@angular/core';
import {AuthManager} from '../../../../services/auth-manager.service';
import {User} from '../../../../models/user';
import {UserProxy} from '../../../../services/proxy/user-proxy.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent {
  editMode: boolean = false;

  @Input() user: User;
  errors: any = {};

  constructor(private authManager: AuthManager,
              private userProxy: UserProxy) {
  }

  onEditClick() {
    this.editMode = true;
  }

  onSubmit() {
    this.userProxy.updateUser(this.user.toJsonObject())
      .then((response) => {
        return this.authManager.authenticateIfNeeded();
      }).then(user => {
        this.editMode = false;
      }).catch(errors => {
        this.errors = errors;
      });
  }
}
