import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'residence-permit-back-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.residence.permit.back.header' | translate"
    [label]="'input.residence.permit.back.label' | translate"
    [showLabel]="showLabel"
    [subHeader]="'input.residence.permit.back.description' | translate"
    [user]="user"
    imageType="residence_permit_back">
  </user-image-card-input>
  `
})
export class ResidencePermitBackInputComponent {
  @Input() user: User;
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
