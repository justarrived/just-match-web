import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'profile-image-input',
  template: `
  <user-image-circular-input
    [centered]="centered"
    [size]="size"
    [user]="user"
    imageType="profile"
    placeholderImageUrl="/assets/images/placeholder-profile-image.png">
  </user-image-circular-input>
  `
})
export class ProfileImageInputComponent {
  @Input() public user: User;
  @Input() public centered: boolean;
  @Input() public size: string = 'medium'; // One of ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', massive]
}
