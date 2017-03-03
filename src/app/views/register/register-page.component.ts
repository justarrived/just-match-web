import {Component} from '@angular/core';

@Component({
  template: `
  <div class="register-container">

    <div class="sub-header-container">
      <h3 class="sub-header-title">
        {{"user.register.title" | translate}}
      </h3>
    </div>

    <div class="ui centered grid">
      <div class="fourteen wide phone ten wide tablet eight wide computer column">

        <register-form></register-form>
      </div>
    </div>
  </div>`
})
export class RegisterPageComponent { }
