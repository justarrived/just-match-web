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
    let file = event.srcElement.files[0].name;
    if (file) {
      this.userProxy.saveImage(this.user.id, file, 'permit').then(userImage => {
        this.user.images.push(userImage);
        this.user.profileImage = userImage;
      });
    }
  }

  extendedFrontendValidation(): boolean {
    return this.user.getNativeLanguage() && this.user.countryOfOriginCode && (this.gotPermit == 'false' || this.user.currentStatus) && true;
  }

  handleServerErrors(errors) {
    this.errorMessage = 'user.profile.form.submit.error';
    if (errors.details) {
      if (Object.keys(errors.details)[0]) {
        this.errorCause = Object.keys(errors.details)[0].split('_').join(' ') + ' ' + errors.details[Object.keys(errors.details)[0]];
        this.errorCause = this.errorCause.charAt(0).toUpperCase() + this.errorCause.slice(1);
      } else {
        this.errorCause = 'user.profile.form.submit.error.nothing';
        throw errors;
      }
    }
  }

  onSubmit() {
    this.saveSuccess = false;
    this.errorMessage = '';
    this.errorCause = '';
    if (!this.extendedFrontendValidation()) {
      this.errorMessage = 'user.profile.form.submit.incomplete';
      return;
    }
    this.userProxy.updateUser(this.user.toJsonObject())
      .then((response) => {
        this.saveSuccess = true;
      })
      .catch(errors => {
        this.handleServerErrors(errors);
      });
  }
}
