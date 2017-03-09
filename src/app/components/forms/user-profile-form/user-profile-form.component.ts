import {ApiErrors} from '../../../models/api-errors';
import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {Document} from '../../../models/document';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {isValidSSNCharCode} from '../../../utils/is-valid-ssn-char-code';
import {map} from 'lodash';
import {OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserDocument} from '../../../models/user/user-document';
import {UserImage} from '../../../models/user/user-image';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  @Input() user: User;

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
    private authManager: AuthManager,
    private userProxy: UserProxy,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
      if (user !== null) {
        this.initForm();
      }
    });
  }

  private initForm(): void {
    this.profileForm = this.formBuilder.group({
      'user_languages': [this.user.userLanguages.slice()],
      'languages': [''],
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
          proficiency: userLanguage['proficiency']
        };
      }),
      'skill_ids': map(this.profileForm.value.user_skills, userSkill => {
        return {
          id: userSkill['skill'].id,
          proficiency: userSkill['proficiency']
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
