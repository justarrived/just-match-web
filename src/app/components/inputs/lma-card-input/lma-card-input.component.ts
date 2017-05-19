import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/api-models/user/user';

@Component({
  selector: 'lma-card-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.lma.card.header' | translate"
    [label]="'input.lma.card.label' | translate"
    [showLabel]="showLabel"
    [description]="'input.lma.card.description' | translate"
    imageField="lmaCardImage"
    imageType="lma_card">
  </user-image-card-input>
  `
})
export class LMACardInputComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
