import {ApiErrors} from '../../../models/api-errors';
import {AuthManager} from '../../../services/auth-manager.service';
import {ChangeDetectorRef} from '@angular/core';
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
  @Input() public user: User;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean;
  public profileForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;

  resumeDocumentStatusObject: any = {
    documentSaveSuccess: false,
    documentSaveFail: false,
    uploadingDocument: false
  };

  constructor(
    private authManager: AuthManager,
    private changeDetector: ChangeDetectorRef,
    private userProxy: UserProxy,
    private formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
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
      'at_und': [this.user.atUnd ? this.user.atUnd : 'no'],
      'competence_text': [this.user.skills],
      'current_status': [this.user.currentStatus],
      'description': [this.user.description],
      'education': [this.user.education],
      'got_coordination_number': [this.user.ssn ? 'yes' : 'no'],
      'job_experience': [this.user.workExperience],
      'languages': [''],
      'skills': [''],
      'ssn': [this.user.ssn],
      'user_languages': [this.user.userLanguages.slice()],
      'user_skills': [this.user.userSkills.slice()]
    });
  }

  public onDocumentFilenameChange(event, type, uploadStatusObject): void {
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

  public isAllowedSSNChar(charCode): boolean {
    return isValidSSNCharCode(charCode);
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public onSubmit(): void {
    this.submitSuccess = false;
    this.submitFail = false;
    this.loadingSubmit = true;
    this.apiErrors = new ApiErrors([]);

    this.userProxy.updateUser(this.user.id, {
      'at_und': this.profileForm.value.at_und,
      'competence_text': this.profileForm.value.competence_text,
      'current_status': this.profileForm.value.current_status,
      'description': this.profileForm.value.description,
      'education': this.profileForm.value.education,
      'language_ids': map(this.profileForm.value.user_languages, userLanguage => {
        return {
          id: userLanguage['language'].id,
          proficiency: userLanguage['proficiency']
        };
      }),
      'job_experience': this.profileForm.value.job_experience,
      'skill_ids': map(this.profileForm.value.user_skills, userSkill => {
        return {
          id: userSkill['skill'].id,
          proficiency: userSkill['proficiency']
        };
      }),
      'ssn': this.profileForm.value.ssn,
    })
      .then((response) => {
        this.authManager.authenticateIfNeeded().then(() => {
          this.submitSuccess = true;
          this.loadingSubmit = false;
        });
      })
      .catch(errors => {
        this.handleServerErrors(errors);
      });
  }
}
