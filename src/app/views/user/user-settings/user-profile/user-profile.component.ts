import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserLanguage} from '../../../../models/user/user-language';
import {LanguageProxy} from '../../../../services/proxy/language-proxy.service';
import {CountryProxy} from '../../../../services/proxy/country-proxy.service';
import {AuthManager} from '../../../../services/auth-manager.service';
import {Country} from '../../../../models/country';
import {Language} from '../../../../models/language/language';
import {User} from '../../../../models/user';
import {isEmpty, some} from 'lodash';
import {deleteElementFromArray} from '../../../../utils/array-util';
import {namePropertyLabel} from '../../../../utils/label-util';
import {LanguageProficiency} from '../../../../models/language/language-proficiency';
import {languageProficiencyLevels} from '../../../../enums/enums';
import {UserProxy} from '../../../../services/proxy/user-proxy.service';
import {AutocompleteDropdownComponent} from '../../../../components/autocomplete-dropdown/autocomplete-dropdown.component';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('nativeLanguageDropdown')
  nativeLanguageDropdown: AutocompleteDropdownComponent;

  @ViewChild('countryDropdown')
  countryDropdown: AutocompleteDropdownComponent;

  namePropertyLabel: Function = namePropertyLabel;

  languageProficiencyLevelsAvailable: LanguageProficiency[] = languageProficiencyLevels;

  @Input() user: User;

  gotPermit: string;
  saveSuccess: boolean;
  errorMessage: string;
  errorCause: string;

  constructor(private languageProxy: LanguageProxy, private countryProxy: CountryProxy, private authManager: AuthManager, private userProxy: UserProxy) {
    // remove native speaker as option
    this.languageProficiencyLevelsAvailable = this.languageProficiencyLevelsAvailable.slice();
    this.languageProficiencyLevelsAvailable.pop();
  }

  ngOnInit() {
    let nativeLanguage = this.user.getNativeLanguage() || { language: { name: '' } };
    let nativeLanguageDropdown = this.nativeLanguageDropdown;
    setTimeout(function() {
      nativeLanguageDropdown.textInput = nativeLanguage.language.name;
    }, 100);

    this.countryProxy.getCountryByCountryCode(this.user.countryOfOriginCode)
      .then((countryOfOrigin) => {
        this.countryDropdown.textInput = countryOfOrigin.name || '';
      });

    this.gotPermit = this.user.currentStatus ? 'true' : 'false';
  }

  getLanguages() {
    return (searchText): Promise<Array<Language>> => {
      return this.languageProxy.getLanguages(searchText);
    };
  }

  getCountries() {
    return (searchText): Promise<Array<Country>> => {
      return this.countryProxy.getCountries(searchText);
    };
  }

  onLanguageSelect(language) {
    if (!isEmpty(language) && !some(this.user.userLanguages, { language: language })) {
      let userLanguage = new UserLanguage({ proficiency: 1 });
      userLanguage.language = language;

      this.user.userLanguages.push(userLanguage);
    }
  }

  onNativeLanguageSelect(language) {
    if (language) {
      let nativeLanguage = new UserLanguage({ proficiency: 5 });
      nativeLanguage.language = language;

      let oldNativeLanguage = this.user.getNativeLanguage();

      if (oldNativeLanguage) {
        deleteElementFromArray(this.user.userLanguages, oldNativeLanguage);
      }

      deleteElementFromArray(this.user.userLanguages, this.user.userLanguages.find(lang => lang.language && lang.language.languageCode === language.languageCode));

      this.user.userLanguages.push(nativeLanguage);
    }
  }

  onNCountryOfOriginSelect(country) {
    if (country) {
      this.user.countryOfOriginCode = country.countryCode;
    }
  }

  onRemoveUserLanguage(userLanguage) {
    deleteElementFromArray(this.user.userLanguages, userLanguage);
  }

  onPermitImageFilenameChange(event) {
    let file = event.srcElement.files[0];
    if (file) {
      let data = new FormData();
      data.append('image', file);
      data.append('category', 'permit');
      this.userProxy.saveImage(this.user.id, data).then(userImage => {
        this.user.images.push(userImage);
      });
    }
  }

  validForm(): boolean {
    return this.user.getNativeLanguage() && this.user.countryOfOriginCode && (this.gotPermit == 'false' || this.user.currentStatus) && true;
  }

  onSubmit() {
    this.saveSuccess = false;
    this.errorMessage = '';
    this.errorCause = '';
    if (!this.validForm()) {
      this.errorMessage = 'user.profile.form.submit.incomplete';
      return;
    }
    this.userProxy.updateUser(this.user.toJsonObject())
      .then((response) => {
        this.saveSuccess = true;
        return this.authManager.authenticateIfNeeded();
      })
      .catch(errors => {
        this.errorMessage = 'user.profile.form.submit.server.error';
        if (errors.details) {
          if (Object.keys(errors.details)[0]) {
            this.errorCause = Object.keys(errors.details)[0].split('_').join(' ') + ' ' + errors.details[Object.keys(errors.details)[0]];
            this.errorCause = this.errorCause.charAt(0).toUpperCase() + this.errorCause.slice(1);
          } else {
            this.errorCause = 'user.profile.form.submit.server.error.nothing';
          }
        }
      });
  }
}
