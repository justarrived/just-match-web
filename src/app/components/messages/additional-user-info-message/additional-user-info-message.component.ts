import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'additional-user-info-message',
  template: `
  <sm-message
    [closeable]="true">
    <div class="ui form">
      <div class="ui basic center aligned segment">
        <h2>
          {{'We are interested in you' | translate}}
        </h2>
        <p>
          {{'Consider providing us with more information to increse your chances to get jobs' | translate}}
        </p>
        <div class="ui centered grid">
          <div class="fourteen wide phone ten wide tablet eight wide computer column">
            <form class="ui form">
              <user-missing-traits-next-form></user-missing-traits-next-form>
            </form>
          </div>
        </div>
      </div>
    </div>
  </sm-message>`
})
export class AdditionalUserInfoMessageComponent {

}
