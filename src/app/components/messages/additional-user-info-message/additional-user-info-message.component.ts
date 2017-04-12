import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'additional-user-info-message',
  template: `
  <sm-message
    [closeable]="true">
    <div class="ui form">
      <div class="ui basic center aligned segment">
        <h3>
          {{'We are interested in you' | translate}}
        </h3>
        <p>
          Consider providing us with more information to increse your chances to get jobs
        </p>
        <resume-input
          [centered]="true"
          [showLabel]="false">
        </resume-input>
        <form-submit-button
          [showButton]="true"
          [submitFail]="false"
          [submitSuccess]="false"
          [buttonText]="'Next' | translate">
        </form-submit-button>
      </div>
    </div>
  </sm-message>`
})
export class AdditionalUserInfoMessageComponent {

}
