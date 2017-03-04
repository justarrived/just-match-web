import {Component} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'cookies.info.title' | translate"
    icon="exclamation">
  </basic-border-header>
  <div class="ui basic very padded segment">
    <info-message
      [header]="'cookies.info.description' | translate"
      icon="warning">
    </info-message>
  </div>`
})
export class CookiesAboutPageComponent {}
