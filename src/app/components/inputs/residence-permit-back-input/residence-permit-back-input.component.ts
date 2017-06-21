import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'residence-permit-back-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.residence.permit.back.header' | translate"
    [label]="'input.residence.permit.back.label' | translate"
    [showLabel]="showLabel"
    [description]="'input.residence.permit.back.description' | translate"
    imageField="residencePermitBackImage"
    imageType="residence_permit_back">
  </user-image-card-input>
  `
})
export class ResidencePermitBackInputComponent extends BaseComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
