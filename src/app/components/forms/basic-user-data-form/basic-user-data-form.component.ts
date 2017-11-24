import {AnalyticsActions} from '../../../services/analytics.service';
import {AnalyticsService} from '../../../services/analytics.service';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {map} from 'lodash';
import {NavigationService} from '../../../services/navigation.service';
import {User} from '../../../models/api-models/user/user';
import {UserPasswordProxy} from '../../../proxies/user-password/user-password.proxy';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';
import {BaseComponent} from '../../base.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'basic-user-data-form',
  templateUrl: './basic-user-data-form.component.html'
})
export class BasicUserDataFormComponent extends BaseComponent {
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean;
  public settingsForm: FormGroup;
  public submitFail: boolean;
  public submitSuccess: boolean;

  public constructor(
    private analyticsService: AnalyticsService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userPasswordProxy: UserPasswordProxy,
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
      this.settingsForm = this.formBuilder.group({
        'interests': [''],
        'languages': [''],
        'occupations': [''],
        'skills': [''],
        'user_interests': [this.user.userInterests.slice()],
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
      'interest_ids': map(this.settingsForm.value.user_interests, userInterest => {
        return {
          id: userInterest['interest'].id,
          level: userInterest['level']
        };
      }),
      'language_ids': map(this.settingsForm.value.user_languages, userLanguage => {
        return {
          id: userLanguage['language'].id,
          proficiency: userLanguage['proficiency']
        };
      }),
      'occupation_ids': map(this.settingsForm.value.user_occupations, userOccupation => {
        return {
          id: userOccupation['occupation'].id,
          years_of_experience: userOccupation['yearsOfExperience']
        };
      }),
      'skill_ids': map(this.settingsForm.value.user_skills, userSkill => {
        return {
          id: userSkill['skill'].id,
          proficiency: userSkill['proficiency']
        };
      }),
    }, {
      'include': UserResolver.includes,
    })
    .then(user => {
      this.analyticsService.publishEvent(AnalyticsActions.UpdateUserSuccess, {user: this.user.id});

      this.userResolver.setUser(user);
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
