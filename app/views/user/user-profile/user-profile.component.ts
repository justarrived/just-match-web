import {Component} from "@angular/core";
import {UserProfile} from "../../../models/user/user-profile";
import {UserProxy} from "../../../services/user-proxy.service";

@Component({
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent {
  userProfile: UserProfile = new UserProfile();

  constructor(private userProxy: UserProxy) { }

}
