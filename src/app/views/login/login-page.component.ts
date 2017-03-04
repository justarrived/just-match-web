import {Component} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'login.title' | translate"
    icon="lock">
  </basic-border-header>

  <div class="ui centered grid">
    <div class="fourteen wide phone ten wide tablet eight wide computer column login-form-container">
      <login-form></login-form>
    </div>
  </div>`,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {}
