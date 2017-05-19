import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/api-models/user/user';

@Component({
  selector: 'residence-permit-front-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.residence.permit.front.header' | translate"
    [label]="'input.residence.permit.front.label' | translate"
    [showLabel]="showLabel"
    [description]="'input.residence.permit.front.description' | translate"
    imageField="residencePermitFrontImage"
    imageType="residence_permit_front">
  </user-image-card-input>
  `
})
export class ResidencePermitFrontInputComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
