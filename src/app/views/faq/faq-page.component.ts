import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  template: `
  <div class="faq-container">
    <div class="sub-header-container">
      <h3 class="sub-header-title">
        {{'faq.title' | translate}}
      </h3>
    </div>
    <faq-accordion></faq-accordion>
  </div>
  `
})
export class FaqPageComponent {}
