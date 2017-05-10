import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {Document} from '../../../models/api-models/document/document';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {map} from 'lodash';
import {MissingUserTraits} from '../../../models/api-models/missing-user-traits/missing-user-traits';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {UpdateUserAttributes} from '../../../proxies/user/user.proxy';
import {User} from '../../../models/api-models/user/user';
import {UserDocument} from '../../../models/api-models/user-document/user-document';
import {UserImage} from '../../../models/api-models/user-image/user-image';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'user-update-form',
  templateUrl: './user-update-form.component.html'
})
export class UserUpdateFormComponent implements OnInit, OnDestroy {
  @Input() public missingUserTraits = null as MissingUserTraits;
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public updateForm: FormGroup;
  public user: User;

  private userSubscription: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private userProxy: UserProxy,
    private userResolver: UserResolver,
  ) {
  }

  public ngOnInit(): void {
    this.initUser();
    this.initForm();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      if (user) {
        this.user = user;
        this.initForm();
      }
    });
  }

  private initForm(): void {
    this.updateForm = this.formBuilder.group({
      'at_und': [this.user.atUnd ? this.user.atUnd : 'no'],
      'bank_account': [this.user.bankAccount],
      'city': [this.user.city],
      'competence_text': [this.user.competenceText],
      'country_of_origin': [this.user.countryOfOrigin],
      'current_status': [this.user.currentStatus],
      'description': [this.user.description],
      'education': [this.user.education],
      'email': [this.user.email, Validators.compose([Validators.required])],
      'facebook_url': [this.user.facebookUrl],
      'first_name': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'gender': [this.user.gender],
      'got_coordination_number': [this.user.ssn ? 'yes' : 'no'],
      'interests': [''],
      'job_experience': [this.user.jobExperience],
      'languages': [''],
      'last_name': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'linkedin_url': [this.user.linkedinUrl],
      'phone': [this.user.phone, Validators.compose([Validators.required])],
      'skills': [''],
      'ssn': [this.user.ssn],
      'street': [this.user.street],
      'system_language_id': [this.user.systemLanguage.id, Validators.compose([Validators.required])],
      'user_interests': [this.user.userInterests.slice()],
      'user_languages': [this.user.userLanguages.slice()],
      'user_skills': [this.user.userSkills.slice()],
      'zip': [this.user.zip],
    });
  }

  public ngOnDestroy(): void {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  private getRequestedUpdateAttributes(attributeObject: UpdateUserAttributes): UpdateUserAttributes {
    let requestedUpdateAttributes = {};
    for (let trait in this.missingUserTraits) {
      requestedUpdateAttributes[trait] = attributeObject[trait];
    }
    return requestedUpdateAttributes;
  }

  public submitForm(): Promise<User> {
    this.submitSuccess = false;
    this.submitFail = false;
    this.loadingSubmit = true;
    this.apiErrors = new ApiErrors([]);

    const updateAttributes = {
      'at_und': this.updateForm.value.at_und,
      'bank_account': this.updateForm.value.bank_account,
      'city': this.updateForm.value.city,
      'competence_text': this.updateForm.value.competence_text,
      'country_of_origin': this.updateForm.value.country_of_origin,
      'current_status': this.updateForm.value.current_status,
      'cv': null,
      'description': this.updateForm.value.description,
      'education': this.updateForm.value.education,
      'email': this.updateForm.value.email,
      'facebook_url': this.updateForm.value.facebook_url,
      'first_name': this.updateForm.value.first_name,
      'gender': this.updateForm.value.gender,
      'interest_ids': map(this.updateForm.value.user_interests, userInterest => {
        return {
          id: userInterest['interest'].id,
          level: userInterest['level']
        };
      }),
      'job_experience': this.updateForm.value.job_experience,
      'language_ids': map(this.updateForm.value.user_languages, userLanguage => {
        return {
          id: userLanguage['language'].id,
          proficiency: userLanguage['proficiency']
        };
      }),
      'last_name':this.updateForm.value.last_name,
      'linkedin_url': this.updateForm.value.linkedin_url,
      'phone': this.updateForm.value.phone,
      'skill_ids': map(this.updateForm.value.user_skills, userSkill => {
        return {
          id: userSkill['skill'].id,
          proficiency: userSkill['proficiency']
        };
      }),
      'ssn': this.updateForm.value.ssn,
      'street': this.updateForm.value.street,
      'zip': this.updateForm.value.zip,
    };

    return this.userProxy.updateUser(this.user.id, this.getRequestedUpdateAttributes(updateAttributes), {
      'include': this.userResolver.defaultIncludeResourcesString,
    })
    .then(user => {
      this.userResolver.setUser(user);
      this.submitSuccess = true;
      this.loadingSubmit = false;
      return user;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      if (this.isInModal) {
        throw errors;
      }
    });
  }
}
