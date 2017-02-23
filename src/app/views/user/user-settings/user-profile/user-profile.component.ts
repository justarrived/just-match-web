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
import {LanguageProficiencyLevels, languageProficiencyLevelsList} from '../../../../models/language/language-proficiency-levels';
import {SkillProficiencyLevels, skillProficiencyLevelsList} from '../../../../models/skill/skill-proficiency-levels';
import {UserProxy} from '../../../../services/proxy/user-proxy.service';
import {AutocompleteDropdownComponent} from '../../../../components/autocomplete-dropdown/autocomplete-dropdown.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TranslationListener} from '../../../../components/translation.component';
import {TranslationService} from '../../../../services/translation.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends TranslationListener implements OnInit {
  private readonly ZERO_DIGIT: number = 48;
  private readonly NINE_DIGIT: number = 57;

  @ViewChild('nativeLanguageDropdown')
  private nativeLanguageDropdown: AutocompleteDropdownComponent;

  @ViewChild('defaultLanguageDropdown')
  private defaultLanguageDropdown: AutocompleteDropdownComponent;

  @ViewChild('countryDropdown')
  private countryDropdown: AutocompleteDropdownComponent;

  private namePropertyLabel: Function = namePropertyLabel;

  private languageExpertProficiency: LanguageProficiency = LanguageProficiencyLevels.expert;
  private languageProficiencyLevelsAvailable: LanguageProficiency[] = languageProficiencyLevelsList;
  private skillProficiencyLevelsAvailable: LanguageProficiency[] = skillProficiencyLevelsList;

  @Input() private user: User;

  private countries: Country[];
  private languages: Language[];
  private systemLanguages: Language[];
  private languagesExcludingNative: Language[];
  private ss: Language;
  private skills: Skill[];

  private profileForm: FormGroup;

  private statuses: UserStatus[];

  private serverValidationErrors: any = {};
  private saveSuccess: boolean;
  private saveFail: boolean;
  private loadingSubmit: boolean = false;

  private residencePermitFrontImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  private residencePermitBackImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  private lmaImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  private skatteverketCertificateImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  private personalIdImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  private workPermitFrontImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  private workPermitBackImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  constructor(
    private languageProxy: LanguageProxy,
    private countryProxy: CountryProxy,
    private skillProxy: SkillProxy,
    private authManager: AuthManager,
    private userProxy: UserProxy,
    private formBuilder: FormBuilder,
    protected translationService: TranslationService
  ) {
    super(translationService);
    // remove native speaker as option
    this.languageProficiencyLevelsAvailable = this.languageProficiencyLevelsAvailable.slice();
    this.languageProficiencyLevelsAvailable.pop();
  }

  ngOnInit() {
    this.loadData();
    this.initForm();

    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
      if(user != null) {
        this.loadData();
        this.initForm();
      }
    });
  }

  loadData() {
    this.userProxy.getStatuses().then(statuses => this.statuses = statuses);
    this.countryProxy.getCountries().then(countries => this.countries = countries);
    this.languageProxy.getSystemLanguages().then(languages => {
      this.systemLanguages = languages;
    });
    this.languageProxy.getLanguages().then(languages => {
      this.languages = languages;
      this.languagesExcludingNative = languages.slice();
      let nativeLanguage = this.user.getNativeLanguage();
      if (nativeLanguage) {
        deleteElementFromArrayLambda(this.languagesExcludingNative, lang => lang.languageCode === nativeLanguage.language.languageCode)
      }
    });
    this.skillProxy.getSkills().then(skills => this.skills = skills);
  }

  private initForm() {
    this.profileForm = this.formBuilder.group({
      'user_languages': [this.user.userLanguages.slice()],
      'native_language': [this.user.getNativeLanguage(), Validators.compose([Validators.required])],
      'default_language': [this.user.languageId, Validators.compose([Validators.required])],
      'country_of_origin': [this.user.countryOfOriginCode, Validators.compose([Validators.required])],
      'current_status': [this.user.currentStatus],
      'at_und': [this.user.atUnd ? this.user.atUnd : 'no'],
      'got_coordination_number': [this.user.ssn ? 'yes' : 'no'],
      'ssn': [this.user.ssn],
      'competence_text': [this.user.skills],
      'job_experience': [this.user.workExperience],
      'user_skills': [this.user.userSkills.slice()]
    });

    const nativeLanguage = this.user.getNativeLanguage() || { language: { name: '' } };
    const nativeLanguageDropdown = this.nativeLanguageDropdown;
    setTimeout(function() {
      nativeLanguageDropdown.textInput = nativeLanguage.language.name;
    }, 100);

    this.countryProxy.getCountryByCountryCode(this.user.countryOfOriginCode)
      .then((countryOfOrigin) => {
        this.countryDropdown.textInput = countryOfOrigin.name || '';
      });

    this.languageProxy.getLanguage(this.user.languageId)
      .then((defaultLanguage) => {
        this.defaultLanguageDropdown.textInput = defaultLanguage.name || '';
      });
  }

  private onNativeLanguageSelect(language) {
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

      this.languagesExcludingNative = this.languages.slice();
      deleteElementFromArrayLambda(this.languagesExcludingNative, lang => lang.languageCode === nativeLanguage.language.languageCode)
    }
  }

  private onCountryOfOriginSelect(country) {
    if (country) {
      this.profileForm.controls['country_of_origin'].setValue(country.countryCode);
    }
  }

  private onDefaultLanguageSelect(language) {
    if (language) {
      this.profileForm.value.default_language = language.id;
    }
  }

  private onLanguageSelect(language) {
    if (!isEmpty(language) && !some(this.profileForm.value.user_languages, { language: language })) {
      const userLanguage = new UserLanguage({ proficiency: 1 });
      userLanguage.language = language;

      this.profileForm.value.user_languages.push(userLanguage);
    }
  }

  private onSkillSelect(skill) {
    if (!isEmpty(skill) && !some(this.profileForm.value.user_skills, { skill: skill })) {
      const userSkill = new UserSkill({ proficiency: 1 });
      userSkill.skill = skill;

      this.profileForm.value.user_skills.push(userSkill);
    }
  }

  private onRemoveUserLanguage(userLanguage) {
    deleteElementFromArray(this.profileForm.value.user_languages, userLanguage);
  }

  private onRemoveUserSkill(userSkill) {
    deleteElementFromArray(this.profileForm.value.user_skills, userSkill);
  }

  private onImageFilenameChange(event, type, uploadStatusObject) {
    uploadStatusObject.imageSaveFail = false;
    uploadStatusObject.imageSaveSuccess = false;
    uploadStatusObject.uploadingImage = true;
    const file = event.srcElement.files[0];
    if (file) {
      this.userProxy.saveImage(this.user.id, file, type).then(userImage => {
        this.user[type + '_image'] = userImage;
        uploadStatusObject.imageSaveSuccess = true;
        uploadStatusObject.uploadingImage = false;
      }).catch(errors => {
        uploadStatusObject.imageSaveFail = true;
        uploadStatusObject.uploadingImage = false;
      });
    }
  }

  private formValidation(): boolean {
    return this.profileForm.valid && true;
  }

  private handleServerErrors(errors) {
    this.saveFail = true;
    this.serverValidationErrors = errors.details || errors;
  }

  private checkInputType(event): boolean {
    return event.charCode >= this.ZERO_DIGIT && event.charCode <= this.NINE_DIGIT;
  }

  private onSubmit() {
    this.saveSuccess = false;
    this.saveFail = false;
    this.loadingSubmit = true;
    this.serverValidationErrors = {};

    this.userProxy.updateUser(this.user.id, {
      'language_id': this.profileForm.value.default_language,
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
      'at_und': this.profileForm.value.at_und,
      'ssn': this.profileForm.value.ssn,
      'competence_text': this.profileForm.value.competence_text,
      'job_experience': this.profileForm.value.job_experience
    })
      .then((response) => {
        this.authManager.authenticateIfNeeded().then(() => {
          this.saveSuccess = true;
          this.loadingSubmit = false;
        });
      })
      .catch(errors => {
        this.handleServerErrors(errors);
        this.loadingSubmit = false;
      });
  }
}
