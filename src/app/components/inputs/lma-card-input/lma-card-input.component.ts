import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'lma-card-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.lma.card.header' | translate"
    [label]="'input.lma.card.label' | translate"
    [showLabel]="showLabel"
    [description]="'input.lma.card.description' | translate"
    imageField="lmaCardImage"
    imageType="lma_card">
  </user-image-card-input>
  `
})
export class LMACardInputComponent extends BaseComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
