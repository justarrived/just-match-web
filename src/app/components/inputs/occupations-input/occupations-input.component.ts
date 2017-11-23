import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {deleteElementFromArray} from '../../../utils/array/array.util';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {Occupation} from '../../../models/api-models/occupation/occupation';
import {OccupationProxy} from '../../../proxies/occupation/occupation.proxy';
import {some} from 'lodash';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {UserOccupation} from '../../../models/api-models/user-occupation/user-occupation';
import {UserOccupationFactory} from '../../../models/api-models/user-occupation/user-occupation';

@Component({
  selector: 'occupations-input',
  template: `
  <div class="ui form">
    <basic-loader
      [complete]="!loadingOccupation"
      [promise]="occupations"
      class="inverted">
    </basic-loader>
    <select-dropdown-input
      (onChange)="onAddOccupation($event)"
      [apiErrors]="apiErrors"
      [control]="occupationsControl"
      [data]="occupations | async"
      [hint]="hint"
      [label]="'input.occupations.label' | translate"
      [placeholder]="'input.occupations.placeholder' | translate"
      apiAttribute="occupation_ids"
      dataItemLabelProperty="translatedText.name"
      dataItemValueProperty="id">
    </select-dropdown-input>
    <basic-text
      [text]="'input.occupations.hint' | translate"
      *ngIf="userOccupationsControl.value?.length > 0"
      color="black">
    </basic-text>
    <div *ngFor="let userOccupation of userOccupationsControl.value">
      <occupation-years-of-experience-input
        [apiErrors]="apiErrors"
        [control]="getYearsOfExperienceControl(userOccupation)"
        (onDelete)="onRemoveUserOccupation(userOccupation)"
        [label]="userOccupation.occupation.translatedText.name">
      </occupation-years-of-experience-input>
    </div>
  </div>`
})
export class OccupationsInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public hint: string;
  @Input() public occupationIds: string[];
  @Input() public occupationsControl: FormControl;
  @Input() public userOccupationsControl: FormControl;

  public occupations: Promise<Occupation[]>;
  public loadingOccupation: boolean;

  constructor(
    private occupationProxy: OccupationProxy,
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
    this.occupations = this.occupationProxy.getOccupations({
      'page[size]': 150,
      'filter[id]': (this.occupationIds ? this.occupationIds.join(',') : null),
    });
  }

  public onRemoveUserOccupation(userOccupation): void {
    deleteElementFromArray(this.userOccupationsControl.value, userOccupation);
  }

  public getYearsOfExperienceControl(userOccupation): void {
    if (!userOccupation['control']) {
      userOccupation['control'] = new FormControl(userOccupation.yearsOfExperience);
      userOccupation['control'].valueChanges.subscribe(value =>   userOccupation.yearsOfExperience = value);
    }

    return userOccupation['control']
  }

  public onAddOccupation(occupationId): void {
    if (occupationId && !some(this.userOccupationsControl.value, { occupation: {id: occupationId} })) {
      const userOccupation = UserOccupationFactory.createUserOccupation({});
      userOccupation.yearsOfExperience = 1;
      this.loadingOccupation = true;

      this.occupationProxy.getOccupation(occupationId)
      .then(occupation => {
        userOccupation.occupation = occupation;
        this.userOccupationsControl.value.push(userOccupation);
        this.loadingOccupation = false;
      })
      .catch(errors => {
        this.loadingOccupation = false;
      });
    }
  }
}
