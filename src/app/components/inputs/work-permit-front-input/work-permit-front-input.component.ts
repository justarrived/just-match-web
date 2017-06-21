import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'work-permit-front-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.work.permit.front.header' | translate"
    [label]="'input.work.permit.front.label' | translate"
    [showLabel]="showLabel"
    [description]="'input.work.permit.front.description' | translate"
    imageField="workPermitFrontImage"
    imageType="work_permit_front">
  </user-image-card-input>
  `
})
export class WorkPermitFrontInputComponent extends BaseComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
