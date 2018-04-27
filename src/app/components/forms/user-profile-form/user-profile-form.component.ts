import {AnalyticsActions} from '../../../services/analytics.service';
import {AnalyticsService} from '../../../services/analytics.service';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {map} from 'lodash';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserDocument} from '../../../models/api-models/user-document/user-document';
import {UserImage} from '../../../models/api-models/user-image/user-image';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'user-profile-form',
  templateUrl: './user-profile-form.component.html'
})
export class UserProfileFormComponent extends BaseComponent {
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean;
  public profileForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;

  constructor(
    private analyticsService: AnalyticsService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private userProxy: UserProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initForm();
  }

  public userChanged(user: User): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.user) {
      this.profileForm = this.formBuilder.group({
        'at_und': [this.user.atUnd ? this.user.atUnd : 'no'],
        'competence_text': [this.user.competenceText],
        'current_status': [this.user.currentStatus],
        'description': [this.user.description],
        'education': [this.user.education],
        'facebook_url': [this.user.facebookUrl],
        'got_coordination_number': [this.user.ssn ? 'yes' : 'no'],
        'job_experience': [this.user.jobExperience],
        'languages': [''],
        'linkedin_url': [this.user.linkedinUrl],
        'occupations': [''],
        'skills': [''],
        'ssn': [this.user.ssn],
        'user_languages': [this.user.userLanguages.slice()],
        'user_occupations': [this.user.userOccupations.slice()],
        'user_skills': [this.user.userSkills.slice()],
      });
    }
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<User> {
    this.submitSuccess = false;
    this.submitFail = false;
    this.loadingSubmit = true;
    this.apiErrors = new ApiErrors([]);

    this.analyticsService.publishEvent(AnalyticsActions.UpdateUserTry, {user: this.user.id});

    return this.userProxy.updateUser(this.user.id, {
      'at_und': this.profileForm.value.at_und,
      'competence_text': this.profileForm.value.competence_text,
      'current_status': this.profileForm.value.current_status,
      'description': this.profileForm.value.description,
      'education': this.profileForm.value.education,
      'facebook_url': this.profileForm.value.facebook_url,
      'language_ids': map(this.profileForm.value.user_languages, userLanguage => {
        return {
          id: userLanguage['language'].id,
          proficiency: userLanguage['proficiency']
        };
      }),
      'linkedin_url': this.profileForm.value.linkedin_url,
      'job_experience': this.profileForm.value.job_experience,
      'skill_ids': map(this.profileForm.value.user_skills, userSkill => {
        return {
          id: userSkill['skill'].id,
          proficiency: userSkill['proficiency']
        };
      }),
      'occupation_ids': map(this.profileForm.value.user_occupations, userOccupation => {
        return {
          id: userOccupation['occupation'].id,
          years_of_experience: userOccupation['yearsOfExperience']
        };
      }),
      'ssn': this.profileForm.value.ssn,
    }, {
      'include': UserResolver.includes,
    })
    .then(user => {
      this.analyticsService.publishEvent(AnalyticsActions.UpdateUserSuccess, {user: this.user.id});

      this.userResolver.setUser(user)
      this.submitSuccess = true;
      this.loadingSubmit = false;
      return user;
    })
    .catch(errors => {
      this.handleServerErrors(errors);

      this.analyticsService.publishEvent(AnalyticsActions.UpdateUserFail, {user: this.user.id});

      if (this.isInModal) {
        throw errors;
      }
      return null;
    });
  }
}
