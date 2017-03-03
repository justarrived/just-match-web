import {Component} from '@angular/core';

@Component({
  template: `
  <div class="login-container">
    <div class="sub-header-container">
      <h3 class="sub-header-title">{{'login.title' | translate}}</h3>
    </div>

    <div class="ui centered grid">
      <div class="fourteen wide phone ten wide tablet eight wide computer column login-form-container">
        <login-form></login-form>
      </div>
    </div>
  </div>`,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {}
