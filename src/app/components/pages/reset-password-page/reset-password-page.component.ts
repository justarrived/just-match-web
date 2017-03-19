import {Component} from '@angular/core';

@Component({
  template:
  `
  <div class="reset-password-container">
    <basic-border-header
      [header]="'reset.password.title' | translate"
      icon="key">
    </basic-border-header>

    <div class="ui centered grid reset-password-form-container">
      <div class="fourteen wide phone ten wide tablet eight wide computer column">
        <reset-password-form></reset-password-form>
      </div>
    </div>
  </div>`,
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent {}
