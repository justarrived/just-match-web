import {Component} from "@angular/core";
import {UserProfile} from "../../../models/user/user-profile";
import {UserProxy} from "../../../services/user-proxy.service";
import {AuthManager} from "../../../services/auth-manager.service";
import {User} from "../../../models/user";
import {namePropertyLabel} from "../../../utils/label-util";
import {LanguageProxy} from "../../../services/proxy/language-proxy.service";
import {languageProficiencyLevels} from "../../../enums/enums";
import {isEmpty, some} from "lodash";
import {deleteElementFromArray} from "../../../utils/array-util";

@Component({
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent {
  namePropertyLabel: Function = namePropertyLabel;

  languageProficiencyLevels = languageProficiencyLevels;

  editMode: boolean = false;

  user: User;
  userProfile: UserProfile;

  constructor(private userProxy: UserProxy,
              private languageProxy: LanguageProxy,
              private authManager: AuthManager) {
    this.user = this.authManager.getUser();
    this.userProfile = new UserProfile(this.user);
  }

  getLanguages() {
    return (searchText) => {
      return this.languageProxy.getLanguages(searchText);
    };
  }

  onLanguageSelect(language) {
    if (!isEmpty(language) && !some(this.userProfile.languages, language)) {
      this.userProfile.languages.push(language);
    }
  }

  onRemoveLanguage(language) {
    deleteElementFromArray(this.userProfile.languages, language);
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
