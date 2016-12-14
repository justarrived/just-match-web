import {Component, Input} from '@angular/core';
import {UserLanguage} from '../../../../models/user/user-language';
import {LanguageProxy} from '../../../../services/proxy/language-proxy.service';
import {AuthManager} from '../../../../services/auth-manager.service';
import {Language} from '../../../../models/language/language';
import {User} from '../../../../models/user';
import {isEmpty, some} from 'lodash';
import {deleteElementFromArray} from '../../../../utils/array-util';
import {namePropertyLabel} from '../../../../utils/label-util';
import {LanguageProficiency} from '../../../../models/language/language-proficiency';
import {languageProficiencyLevels} from '../../../../enums/enums';
import {UserProxy} from '../../../../services/proxy/user-proxy.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  namePropertyLabel: Function = namePropertyLabel;

  languageProficiencyLevels: LanguageProficiency[] = languageProficiencyLevels;

  editMode: boolean = false;

  @Input() user: User;

  constructor(private languageProxy: LanguageProxy,
              private authManager: AuthManager,
              private userProxy: UserProxy) {
  }

  getLanguages() {
    return (searchText): Promise<Array<Language>> => {
      return this.languageProxy.getLanguages(searchText);
    };
  }

  onLanguageSelect(language) {
    if (!isEmpty(language) && !some(this.user.userLanguages, {language: language})) {
      let userLanguage = new UserLanguage({proficiency: 1});
      userLanguage.language = language;

      this.user.userLanguages.push(userLanguage);
    }
  }

  onRemoveUserLanguage(userLanguage) {
    deleteElementFromArray(this.user.userLanguages, userLanguage);
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
    });
  }
}
