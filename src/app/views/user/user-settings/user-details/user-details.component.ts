import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../../models/user';


@Component({
  selector: 'user-details',
  template: `
  <div class="ui centered grid">
    <div class="fourteen wide phone ten wide tablet eight wide computer column">
      <user-details-form [user]="user"></user-details-form>
    </div>
  </div>
  `
})

export class UserDetailsComponent {
  @Input() user: User;
}
