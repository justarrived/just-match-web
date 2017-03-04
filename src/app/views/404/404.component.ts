import {Component} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'page.not.found.error.title' | translate"
    icon="exclamation triangle">
  </basic-border-header>
  <div class="ui basic very padded segment">
    <error-message
      header="{{'page.not.found.error.description' | translate}} 😞"
      icon="warning">
    </error-message>
  </div>`
})
export class NotFoundComponent {}
