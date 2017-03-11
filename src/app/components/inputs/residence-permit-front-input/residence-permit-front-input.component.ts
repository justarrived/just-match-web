import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'residence-permit-front-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.residence.permit.front.header' | translate"
    [label]="'input.residence.permit.front.label' | translate"
    [showLabel]="showLabel"
    [subHeader]="'input.residence.permit.front.description' | translate"
    [user]="user"
    imageType="residence_permit_front"
    imageUniqueName="residence_permit_back">
  </user-image-card-input>
  `
})
export class ResidencePermitFrontInputComponent {
  @Input() user: User;
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
