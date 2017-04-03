import {Component} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'forbidden.error.title' | translate"
    icon="exclamation triangle">
  </basic-border-header>
  <div class="ui basic very padded segment">
    <error-message
      header="{{'forbidden.error.description' | translate}} 😞"
      icon="warning">
    </error-message>
  </div>`
})
export class ForbiddenPageComponent {}
