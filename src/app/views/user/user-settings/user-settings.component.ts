import {Component, OnInit} from '@angular/core';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {User} from '../../../models/user';
import {UserManager} from '../../../services/user-manager.service';
import {AuthManager} from '../../../services/auth-manager.service';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  selectedState: string = 'profile';
  isCompanyUser: boolean;

  user: User;

  constructor(private userProxy: UserProxy, private userManager: UserManager, private authManager: AuthManager) {
    this.user = this.userManager.getUser();
  }

  ngOnInit() {
    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });
  }

  setState(newState) {
    this.authManager.authenticateIfNeeded();
    this.selectedState = newState;
  }

  onProfileImageFilenameChange(event) {
    let file = event.srcElement.files[0];
    if (file) {
      this.userProxy.saveImage(this.user.id, file, 'profile').then(userImage => {
        this.user.profileImage = userImage;
      });
    }
  }
}
