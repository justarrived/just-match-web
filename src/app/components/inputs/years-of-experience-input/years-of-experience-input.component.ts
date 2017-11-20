import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'years-of-experience-input',
  template: `
    <number-input
      [apiErrors]="apiErrors"
      [control]="control"
      [hint]="hint"
      [label]="'input.years.of.experience.label' | translate"
      [max]="100"
      [min]="1"
      [placeholder]="'input.years.of.experience.placeholder' | translate"
      apiAttribute="years_of_experience"
      icon="pink legal">
    </number-input>`
})
export class YearsOfExperienceInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
