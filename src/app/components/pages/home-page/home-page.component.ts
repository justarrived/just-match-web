import {Component} from '@angular/core';

@Component({
  template: `
    <welcome-header></welcome-header>
    <user-missing-traits-message></user-missing-traits-message>

    <new-jobs-section></new-jobs-section>

    <applications-status-section></applications-status-section>

    <how-it-works-and-maximize-chances-section></how-it-works-and-maximize-chances-section>

    <partners-section></partners-section>
  `
})
export class HomePageComponent {}
