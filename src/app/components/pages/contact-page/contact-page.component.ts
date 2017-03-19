import {Component} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'contact.title' | translate"
    icon="comments">
  </basic-border-header>
  <div class="ui centered grid">
    <div class="fourteen wide phone ten wide tablet eight wide computer column">
      <div class="contact-form-container">
        <div class="contact-form-description">
          {{"contact.form.description" | translate}}<br>
          {{"contact.form.instruction" | translate}}
        </div>

        <div class="contact-form-icon-container">
          <i class="contact-form-icon fa fa-envelope fa-5x"></i>
        </div>

        <contact-form></contact-form>
      </div>
    </div>
  </div>`,
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {}
