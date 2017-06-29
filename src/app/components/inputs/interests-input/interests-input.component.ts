import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {deleteElementFromArray} from '../../../utils/array/array.util';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Interest} from '../../../models/api-models/interest/interest';
import {InterestProxy} from '../../../proxies/interest/interest.proxy';
import {Language} from '../../../models/api-models/language/language';
import {some} from 'lodash';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserInterest} from '../../../models/api-models/user-interest/user-interest';
import {UserInterestFactory} from '../../../models/api-models/user-interest/user-interest';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'interests-input',
  template: `
  <div class="ui form">
    <basic-loader
      [complete]="!loadingInterest"
      [promise]="interests"
      class="inverted">
    </basic-loader>
    <select-dropdown-input
      (onChange)="onAddInterest($event)"
      [apiErrors]="apiErrors"
      [control]="interestsControl"
      [data]="interests | async"
      [hint]="hint"
      [label]="'input.interests.label' | translate"
      [placeholder]="'input.interests.placeholder' | translate"
      apiAttribute="interest_ids"
      dataItemLabelProperty="translatedText.name"
      dataItemValueProperty="id">
    </select-dropdown-input>
    <basic-text
      [text]="'input.interests.hint' | translate"
      *ngIf="userInterestsControl.value?.length > 0"
      color="black">
    </basic-text>
    <div *ngFor="let userInterest of userInterestsControl.value">
      <interest-level-input
        (onDelete)="onRemoveUserInterest(userInterest)"
        (onRate)="onLevelChange($event, userInterest)"
        [initialRating]="userInterest.level"
        [label]="userInterest.interest.translatedText.name">
      </interest-level-input>
    </div>
  </div>`
})
export class InterestsInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public hint: string;
  @Input() public interestIds: string[];
  @Input() public interestsControl: FormControl;
  @Input() public userInterestsControl: FormControl;

  public interests: Promise<Interest[]>;
  public loadingInterest: boolean;

  public constructor(
    private interestProxy: InterestProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }


  public onInit(): void {
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  protected loadData(): void {
    this.interests = this.interestProxy.getInterests({
      'page[size]': 100,
      'filter[id]': (this.interestIds ? this.interestIds.join(',') : null),
    });
  }

  public onRemoveUserInterest(userInterest): void {
    deleteElementFromArray(this.userInterestsControl.value, userInterest);
  }

  public onLevelChange(value, userInterest): void {
    userInterest.level = value;
  }

  public onAddInterest(interestId): void {
    if (interestId && !some(this.userInterestsControl.value, { interest: {id: interestId} })) {
      const userInterest = UserInterestFactory.createUserInterest({});
      userInterest.level = 1;
      this.loadingInterest = true;

      this.interestProxy.getInterest(interestId)
      .then(interest => {
        userInterest.interest = interest;
        this.userInterestsControl.value.push(userInterest);
        this.loadingInterest = false;
      })
      .catch(errors => {
        this.loadingInterest = false;
      });
    }
  }
}
