import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'personal-id-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.personal.id.header' | translate"
    [label]="'input.personal.id.label' | translate"
    [showLabel]="showLabel"
    [description]="'input.personal.id.description' | translate"
    imageField="personalIdImage"
    imageType="personal_id">
  </user-image-card-input>
  `
})
export class PersonalIDInputComponent extends BaseComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
