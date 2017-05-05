import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {Document} from '../../../models/api-models/document/document';
import {EventEmitter} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {map} from 'lodash';
import {MissingUserTraits} from '../../../models/api-models/missing-user-traits/missing-user-traits';
import {MissingUserTraitsProxy} from '../../../proxies/missing-user-traits/missing-user-traits.proxy';
import {OnChanges} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {slideInLeftOutLeftAnimation} from '../../../animations/slide-in-left-out-left/slide-in-left-out-left.animation';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UpdateUserAttributes} from '../../../proxies/user/user.proxy';
import {User} from '../../../models/api-models/user/user';
import {UserDocument} from '../../../models/api-models/user-document/user-document';
import {UserImage} from '../../../models/api-models/user-image/user-image';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  animations: [slideInLeftOutLeftAnimation('200ms', '50%')],
  selector: 'user-missing-traits-next-form',
  templateUrl: './user-missing-traits-next-form.component.html'
})
export class UserMissingTraitsNextFormComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  @Input() public isInModal: boolean = false;
  @Output() public onClose: EventEmitter<any> = new EventEmitter<any>();

  public apiErrors: ApiErrors = new ApiErrors([]);
  public animationState: string = 'begin';
  public currentMissingUserTraitIndex: number;
  public informationProvided: boolean;
  public loadingSubmit: boolean;
  public missingUserTraits: MissingUserTraits;
  public missingUserTraitsKeys: string[];
  public submitFail: boolean;
  public submitSuccess: boolean;
  public updateForm: FormGroup;
  public user: User;

  private userSubscription: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private missingUserTraitsProxy: MissingUserTraitsProxy,
    private userProxy: UserProxy,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver,
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.initUser();
    this.initForm();
    this.loadData();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
      if (this.user) {
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

  protected loadData(): void {
    if (this.user) {
      this.missingUserTraitsProxy.getMissingUserTraits(this.user.id)
      .then(missingUserTraits => {
        this.missingUserTraits = missingUserTraits;
        this.missingUserTraitsKeys = Object.keys(this.missingUserTraits);
        this.currentMissingUserTraitIndex = 0;
        this.animationState = 'in';
      });
    }
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public onCloseButtonClicked(): void {
    this.onClose.emit();
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  private getRequestedUpdateAttributes(attributeObject: UpdateUserAttributes): UpdateUserAttributes {
    let requestedUpdateAttributes = {};
    let traitName = this.missingUserTraitsKeys[this.currentMissingUserTraitIndex];
    requestedUpdateAttributes[traitName] = attributeObject[traitName];
    return requestedUpdateAttributes;
  }

  private nextMissingTrait(): void {
    this.animationState = 'out';
    setTimeout(() => {
      this.currentMissingUserTraitIndex++;
      this.animationState = 'begin';
      setTimeout(() => {
        this.animationState = 'in';
      }, 200);
    }, 200);
  }

  private infromationProvided(): void {
    this.animationState = 'out';
    setTimeout(() => {
      this.informationProvided = true;
      this.animationState = 'begin';
      setTimeout(() => {
        this.animationState = 'in';
      }, 200);
    }, 200);
  }

  private hasNextMissingTrait(): boolean {
    return this.currentMissingUserTraitIndex < this.missingUserTraitsKeys.length - 1;
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
      if (this.hasNextMissingTrait()) {
        this.nextMissingTrait();
      } else {
        this.infromationProvided();
      }
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
