import {Component} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'forgot.password.title' | translate"
    icon="unlock">
  </basic-border-header>

  <div class="ui centered grid forgot-password-form-container">
    <div class="fourteen wide phone ten wide tablet eight wide computer column">
      <forgot-password-form></forgot-password-form>
    </div>
  </div>`,
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent {}
