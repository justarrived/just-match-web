import {Component} from '@angular/core';

@Component({
  template: `
  <div class="error-container">
    <div class="sub-header-container">
      <h3 class="sub-header-title">
        {{ 'error.title' | translate }}
      </h3>
    </div>
    <div class="ui basic very padded segment">
      <error-message
        [header]="'error.description' | translate"
        icon="warning">
      </error-message>
    </div>
  </div>`,
})
export class ErrorPageComponent {}
