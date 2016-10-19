import {Component} from "@angular/core";
import {UserProfile} from "../../../models/user/user-profile";
import {UserProxy} from "../../../services/user-proxy.service";
import {AuthManager} from "../../../services/auth-manager.service";

@Component({
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent {
  userProfile: UserProfile;
  editMode: boolean = false;

  constructor(private userProxy: UserProxy, private authManager: AuthManager) {
    this.userProfile = new UserProfile(this.authManager.getUser());
  }

  onEditClick() {
    this.editMode = true;
  }

  onSubmit() {
    this.userProxy.updateUser(this.userProfile.toJsonObject())
      .then((response) => {
        return this.authManager.handleUserResult(response.data);
      }).then(() => {
        this.editMode = false;
    });
  }

}
