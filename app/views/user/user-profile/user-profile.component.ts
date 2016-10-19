import {Component} from "@angular/core";
import {UserProfile} from "../../../models/user/user-profile";
import {UserProxy} from "../../../services/user-proxy.service";
import {AuthManager} from "../../../services/auth-manager.service";
import {User} from "../../../models/user";

@Component({
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent {
  user: User;
  userProfile: UserProfile;
  editMode: boolean = false;

  constructor(private userProxy: UserProxy, private authManager: AuthManager) {
    this.user = this.authManager.getUser();
    this.userProfile = new UserProfile(this.user);
  }

  onImageFilenameChange(event) {
    let file = event.srcElement.files[0];
    let data = new FormData();
    data.append('image', file);
    this.userProxy.saveImage(data).then(userImage => {
      this.userProfile.imageUrl = userImage.imageUrl;
      this.userProfile.imageToken = userImage.oneTimeToken;
    });
  }

  onEditClick() {
    this.editMode = true;
  }

  onSubmit() {
    this.userProxy.updateUser(this.userProfile.toJsonObject())
      .then((response) => {
        return this.authManager.authenticateIfNeeded();
      }).then(user => {
        this.userProfile = new UserProfile(user);
        this.editMode = false;
    });
  }

}
