import {Component} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'user.register.title' | translate"
    icon="add user">
  </basic-border-header>

  <div class="ui centered grid">
    <div class="fourteen wide phone ten wide tablet eight wide computer column">

      <register-form></register-form>
    </div>
  </div>`
})
export class RegisterPageComponent { }
