import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserLanguage} from '../../../../models/user/user-language';
import {UserSkill} from '../../../../models/user/user-skill';
import {UserStatus} from '../../../../models/user/user-status';
import {UserImage} from '../../../../models/user/user-image';
import {LanguageProxy} from '../../../../services/proxy/language-proxy.service';
import {CountryProxy} from '../../../../services/proxy/country-proxy.service';
import {SkillProxy} from '../../../../services/proxy/skill-proxy.service';
import {AuthManager} from '../../../../services/auth-manager.service';
import {Country} from '../../../../models/country';
import {Skill} from '../../../../models/skill/skill';
import {Language} from '../../../../models/language/language';
import {User} from '../../../../models/user';
import {isEmpty, some, map} from 'lodash';
import {deleteElementFromArray} from '../../../../utils/array-util';
import {deleteElementFromArrayLambda} from '../../../../utils/array-util';
import {namePropertyLabel} from '../../../../utils/label-util';
import {LanguageProficiency} from '../../../../models/language/language-proficiency';
import {languageProficiencyLevels} from '../../../../enums/enums';
import {skillProficiencyLevels} from '../../../../enums/enums';
import {UserProxy} from '../../../../services/proxy/user-proxy.service';
import {AutocompleteDropdownComponent} from '../../../../components/autocomplete-dropdown/autocomplete-dropdown.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

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
  skillProficiencyLevelsAvailable: LanguageProficiency[] = skillProficiencyLevels;

  @Input() user: User;

  profileForm: FormGroup;

  statuses: UserStatus[];

  serverValidationErrors: any = {};
  saveSuccess: boolean;
  saveFail: boolean;

  permitImgeSaveSuccess: boolean;
  permitImageSaveFail: boolean;

  constructor(
    private languageProxy: LanguageProxy,
    private countryProxy: CountryProxy,
    private skillProxy: SkillProxy,
    private authManager: AuthManager,
    private userProxy: UserProxy,
    private formBuilder: FormBuilder) {
    // remove native speaker as option
    this.languageProficiencyLevelsAvailable = this.languageProficiencyLevelsAvailable.slice();
    this.languageProficiencyLevelsAvailable.pop();
  }

  ngOnInit() {
    this.userProxy.getStatuses().then(statuses => this.statuses = statuses);

    this.profileForm = this.formBuilder.group({
      'user_languages': [this.user.userLanguages.slice()],
      'native_language': [this.user.getNativeLanguage(), Validators.compose([Validators.required])],
      'country_of_origin': [this.user.countryOfOriginCode, Validators.compose([Validators.required])],
      'current_status': [this.user.currentStatus],
      'competence_text': [this.user.workExperience],
      'job_experience': [this.user.workExperience],
      'got_permit': [this.user.currentStatus ? 'true' : 'false'],
      'user_skills': [this.user.userSkills.slice()]
    });

    const nativeLanguage = this.profileForm.value.native_language || { language: { name: '' } };
    const nativeLanguageDropdown = this.nativeLanguageDropdown;
    setTimeout(function() {
      nativeLanguageDropdown.textInput = nativeLanguage.language.name;
    }, 100);

    this.countryProxy.getCountryByCountryCode(this.profileForm.value.country_of_origin)
      .then((countryOfOrigin) => {
        this.countryDropdown.textInput = countryOfOrigin.name || '';
      });
  }

  getLanguages() {
    return (searchText): Promise<Array<Language>> => {
      return this.languageProxy.getLanguages(searchText);
    };
  }

  getLanguagesExcludingNative() {
    const nativeLanguage = this.profileForm.value.native_language;
    if (!nativeLanguage) {
      return this.getLanguages();
    } else {
      return (searchText): Promise<Array<Language>> => {
        return this.languageProxy.getLanguages(searchText)
          .then((languages) => {
            deleteElementFromArrayLambda(languages, lang => lang.languageCode === nativeLanguage.language.languageCode)
            return languages;
          });
      };
    }

  }

  getCountries() {
    return (searchText): Promise<Array<Country>> => {
      return this.countryProxy.getCountries(searchText);
    };
  }

  getSkills() {
    return (searchText): Promise<Array<Skill>> => {
      return this.skillProxy.getSkills(searchText);
    };
  }

  onNativeLanguageSelect(language) {
    if (language) {
      const nativeLanguage = new UserLanguage({ proficiency: 5 });
      nativeLanguage.language = language;

      const oldNativeLanguage = this.profileForm.value.native_language;

      if (oldNativeLanguage) {
        deleteElementFromArray(this.profileForm.value.user_languages, oldNativeLanguage);
      }

      deleteElementFromArrayLambda(this.profileForm.value.user_languages, lang => lang.language && lang.language.languageCode === language.languageCode)

      this.profileForm.value.user_languages.push(nativeLanguage);
      this.profileForm.controls['native_language'].setValue(nativeLanguage);
    }
  }

  onCountryOfOriginSelect(country) {
    if (country) {
      this.profileForm.controls['country_of_origin'].setValue(country.countryCode);
    }
  }

  onLanguageSelect(language) {
    if (!isEmpty(language) && !some(this.profileForm.value.user_languages, { language: language })) {
      const userLanguage = new UserLanguage({ proficiency: 1 });
      userLanguage.language = language;

      this.profileForm.value.user_languages.push(userLanguage);
    }
  }

  onSkillSelect(skill) {
    if (!isEmpty(skill) && !some(this.profileForm.value.user_skills, { skill: skill })) {
      const userSkill = new UserSkill({ proficiency: 1 });
      userSkill.skill = skill;

      this.profileForm.value.user_skills.push(userSkill);
    }
  }

  onRemoveUserLanguage(userLanguage) {
    deleteElementFromArray(this.profileForm.value.user_languages, userLanguage);
  }

  onRemoveUserSkill(userSkill) {
    deleteElementFromArray(this.profileForm.value.user_skills, userSkill);
  }

  onPermitImageFilenameChange(event) {
    this.permitImageSaveFail = false;
    this.permitImgeSaveSuccess = false;
    const file = event.srcElement.files[0];
    if (file) {
      this.userProxy.saveImage(this.user.id, file, 'work_permit').then(userImage => {
        this.user.permitImage = userImage;
        this.permitImgeSaveSuccess = true;
      }).catch(errors => {
        this.permitImageSaveFail = true;
      });
    }
  }

  formValidation(): boolean {
    return this.profileForm.valid && (this.profileForm.value.got_permit == 'false' || this.profileForm.value.current_status) && true;
  }

  handleServerErrors(errors) {
    this.saveFail = true;
    this.serverValidationErrors = errors.details || errors;
  }

  onSubmit() {
    this.saveSuccess = false;
    this.saveFail = false;
    this.serverValidationErrors = {};

    this.userProxy.updateUser(this.user.id, {
      'language_ids': map(this.profileForm.value.user_languages, userLanguage => {
        return {
          id: userLanguage['language'].id,
          proficiency: userLanguage['proficiency'].proficiency
        };
      }),
      'skill_ids': map(this.profileForm.value.user_skills, userSkill => {
        return {
          id: userSkill['skill'].id,
          proficiency: userSkill['proficiency'].proficiency
        };
      }),
      'country_of_origin': this.profileForm.value.country_of_origin,
      'current_status': this.profileForm.value.current_status,
      'competence_text': this.profileForm.value.competence_text,
      'job_experience': this.profileForm.value.job_experience
    })
      .then((response) => {
        this.saveSuccess = true;
        this.authManager.authenticateIfNeeded();
      })
      .catch(errors => {
        this.handleServerErrors(errors);
      });
  }
}
