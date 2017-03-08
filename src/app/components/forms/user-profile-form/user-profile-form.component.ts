import {ApiErrors} from '../../../models/api-errors';
import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {Country} from '../../../models/country';
import {CountryProxy} from '../../../services/proxy/country-proxy.service';
import {deleteElementFromArray} from '../../../utils/array-util';
import {deleteElementFromArrayLambda} from '../../../utils/array-util';
import {Document} from '../../../models/document';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {isEmpty} from 'lodash';
import {isValidSSNCharCode} from '../../../utils/is-valid-ssn-char-code';
import {Language} from '../../../models/language/language';
import {LanguageProficiency} from '../../../models/language/language-proficiency';
import {LanguageProficiencyLevels} from '../../../models/language/language-proficiency-levels';
import {languageProficiencyLevelsList} from '../../../models/language/language-proficiency-levels';
import {LanguageProxy} from '../../../services/proxy/language-proxy.service';
import {map} from 'lodash';
import {namePropertyLabel} from '../../../utils/label-util';
import {OnInit} from '@angular/core';
import {Skill} from '../../../models/skill/skill';
import {SkillProficiencyLevels} from '../../../models/skill/skill-proficiency-levels';
import {skillProficiencyLevelsList} from '../../../models/skill/skill-proficiency-levels';
import {SkillProxy} from '../../../services/proxy/skill-proxy.service';
import {some} from 'lodash';
import {TranslationListener} from '../../../components/translation.component';
import {TranslationService} from '../../../services/translation.service';
import {User} from '../../../models/user';
import {UserDocument} from '../../../models/user/user-document';
import {UserImage} from '../../../models/user/user-image';
import {UserLanguage} from '../../../models/user/user-language';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {UserSkill} from '../../../models/user/user-skill';
import {Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent extends TranslationListener implements OnInit {
  languageExpertProficiency: LanguageProficiency = LanguageProficiencyLevels.expert;
  languageProficiencyLevelsAvailable: LanguageProficiency[] = languageProficiencyLevelsList;
  skillProficiencyLevelsAvailable: LanguageProficiency[] = skillProficiencyLevelsList;

  @Input() user: User;

  languages: Promise<Language[]>;
  skills: Promise<Skill[]>;

  profileForm: FormGroup;

  apiErrors: ApiErrors = new ApiErrors([]);
  submitSuccess: boolean;
  submitFail: boolean;
  loadingSubmit: boolean;

  residencePermitFrontImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  residencePermitBackImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  lmaImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  skatteverketCertificateImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  personalIdImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  workPermitFrontImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  workPermitBackImageStatusObject: any = {
    imageSaveSuccess: false,
    imageSaveFail: false,
    uploadingImage: false
  };

  resumeDocumentStatusObject: any = {
    documentSaveSuccess: false,
    documentSaveFail: false,
    uploadingDocument: false
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
  }

  ngOnInit(): void {
    this.loadData();
    this.initForm();

    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
      if (user !== null) {
        this.loadData();
        this.initForm();
      }
    });
  }

  public loadData(): void {
    this.languages = this.languageProxy.getLanguages();
    this.skills = this.skillProxy.getSkills();
  }

  private initForm(): void {
    this.profileForm = this.formBuilder.group({
      'user_languages': [this.user.userLanguages.slice()],
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
  }

  onLanguageSelect(language): void {
    if (!isEmpty(language) && !some(this.profileForm.value.user_languages, { language: language })) {
      const userLanguage = new UserLanguage({ proficiency: 1 });
      userLanguage.language = language;

      this.profileForm.value.user_languages.push(userLanguage);
    }
  }

  onSkillSelect(skill): void {
    if (!isEmpty(skill) && !some(this.profileForm.value.user_skills, { skill: skill })) {
      const userSkill = new UserSkill({ proficiency: 1 });
      userSkill.skill = skill;

      this.profileForm.value.user_skills.push(userSkill);
    }
  }

  onRemoveUserLanguage(userLanguage): void {
    deleteElementFromArray(this.profileForm.value.user_languages, userLanguage);
  }

  onRemoveUserSkill(userSkill): void {
    deleteElementFromArray(this.profileForm.value.user_skills, userSkill);
  }

  onImageFilenameChange(event, type, uploadStatusObject): void {
    uploadStatusObject.imageSaveFail = false;
    uploadStatusObject.imageSaveSuccess = false;
    uploadStatusObject.uploadingImage = true;
    const file = event.srcElement.files[0];
    if (!file) {
      return;
    }

    this.userProxy.saveImage(this.user.id, file, type).then(userImage => {
      this.user[type + '_image'] = userImage;
      uploadStatusObject.imageSaveSuccess = true;
      uploadStatusObject.uploadingImage = false;
    }).catch(errors => {
      uploadStatusObject.imageSaveFail = true;
      uploadStatusObject.uploadingImage = false;
    });
  }

  onDocumentFilenameChange(event, type, uploadStatusObject): void {
    uploadStatusObject.documentSaveFail = false;
    uploadStatusObject.documentSaveSuccess = false;
    uploadStatusObject.uploadingDocument = true;
    const file = event.srcElement.files[0];
    if (!file) {
      return;
    }
    this.userProxy.saveDocument(file).then((document) => {
      this.userProxy.saveUserDocument(this.user.id, document, type).then(userDocument => {
        this.user[type + '_document'] = userDocument;
        uploadStatusObject.documentSaveSuccess = true;
        uploadStatusObject.uploadingDocument = false;
      }).catch(errors => {
        uploadStatusObject.documentSaveFail = true;
        uploadStatusObject.uploadingDocument = false;
      });
    }).catch(errors => {
      uploadStatusObject.documentSaveFail = true;
      uploadStatusObject.uploadingDocument = false;
    });
  }

  formValidation(): boolean {
    return this.profileForm.valid && true;
  }

  isAllowedSSNChar(charCode): boolean {
    return isValidSSNCharCode(charCode);
  }

  onSubmit(): void {
    this.submitSuccess = false;
    this.submitFail = false;
    this.loadingSubmit = true;
    this.apiErrors = new ApiErrors([]);

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
          this.submitSuccess = true;
          this.loadingSubmit = false;
        });
      })
      .catch(errors => {
        this.submitFail = true;
        this.apiErrors = errors;
        this.loadingSubmit = false;
      });
  }
}
