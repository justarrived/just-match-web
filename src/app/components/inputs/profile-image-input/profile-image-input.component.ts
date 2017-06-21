import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'profile-image-input',
  template: `
  <user-image-circular-input
    [centered]="centered"
    [size]="size"
    imageField="profileImage"
    imageType="profile"
    placeholderImageUrl="/assets/images/placeholder-profile-image.png">
  </user-image-circular-input>
  `
})
export class ProfileImageInputComponent extends BaseComponent {
  @Input() public centered: boolean;
  @Input() public size: string = 'medium'; // One of ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', massive]

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
