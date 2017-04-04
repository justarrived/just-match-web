import {Component} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'lost.connection.title' | translate">
  </basic-border-header>
  <div class="ui basic very padded segment">
    <error-message
      header="{{'lost.connection.description' | translate}} 😞">
    </error-message>
  </div>`
})
export class LostConnectionPageComponent {}
