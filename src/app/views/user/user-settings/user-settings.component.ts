import {Component, OnInit} from '@angular/core';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {User} from '../../../models/user';
import {UserManager} from '../../../services/user-manager.service';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  selectedState: string = 'profile';
  isCompanyUser: boolean;

  user: User;

  constructor(private userProxy: UserProxy, private userManager: UserManager) {
    this.user = this.userManager.getUser();
  }

  setState(newState) {
    this.selectedState = newState;
  }

  onProfileImageFilenameChange(event) {
    let file = event.srcElement.files[0];
    if (file) {
      let data = new FormData();
      data.append('image', file);
      data.append('category', 'profile');
      this.userProxy.saveImage(this.user.id, data).then(userImage => {
        this.user.images.push(userImage);
        this.user.profileImage = userImage;
      });
    }
  }
}
