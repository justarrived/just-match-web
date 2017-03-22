import {Component} from '@angular/core';

@Component({
  selector: 'user-profile-page',
  template: `
    <user-profile-header></user-profile-header>

    <basic-tabs>
      <basic-tab [tabTitle]="'user.profile.tab.profile.details.title' | translate">
        <div class="ui centered grid">
          <div class="fourteen wide phone ten wide tablet eight wide computer column">
            <user-profile-form></user-profile-form>
          </div>
        </div>
      </basic-tab>
      <basic-tab [tabTitle]="'user.profile.tab.personal.details.title' | translate">
        <div class="ui centered grid">
          <div class="fourteen wide phone ten wide tablet eight wide computer column">
            <user-details-form></user-details-form>
          </div>
        </div>
      </basic-tab>
    </basic-tabs>`
})
export class UserProfilePageComponent  {}
