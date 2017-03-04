import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'faq.title' | translate"
    icon="info circle">
  </basic-border-header>
  <faq-accordion></faq-accordion>
  `
})
export class FaqPageComponent {}
