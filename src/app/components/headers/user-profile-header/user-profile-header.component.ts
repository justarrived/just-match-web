import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'user-profile-header',
  styleUrls: ['./user-profile-header.component.scss'],
  template: `
  <div class="ui centered grid user-profile-header-container">
    <div class="fourteen wide phone ten wide tablet eight wide computer column">
      <div class="ui basic segment">
        <profile-image-input
          [centered]="true"
          [user]="user"
          size="small">
        </profile-image-input>
      </div>
      <h1 class="ui center aligned inverted header">
        <div class="content">
          {{user.name || ('user.profile.header.title' | translate)}}
          <div
            class="sub header">
            {{'user.profile.header.information' | translate}}
          </div>
        </div>
      </h1>
    </div>
  </div>`
})
export class UserProfileHeaderComponent {
  @Input() user: User
}
