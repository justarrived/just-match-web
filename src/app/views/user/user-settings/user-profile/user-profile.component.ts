import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../../models/user';

@Component({
  selector: 'user-profile',
  template: `
  <div class="ui centered grid">
    <div class="fourteen wide phone ten wide tablet eight wide computer column">
      <user-profile-form [user]="user"></user-profile-form>
    </div>
  </div>
  `
})
export class UserProfileComponent  {
  @Input() user: User;
}
