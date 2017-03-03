import {Component} from '@angular/core';

@Component({
  template: `
  <div class="forgot-password-container">
    <div class="sub-header-container">
      <h3 class="sub-header-title">
        {{'forgot.password.title' | translate}}
      </h3>
    </div>

    <div class="ui centered grid forgot-password-form-container">
      <div class="fourteen wide phone ten wide tablet eight wide computer column">
        <forgot-password-form></forgot-password-form>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent {}
