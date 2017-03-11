import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'work-permit-front-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.work.permit.front.header' | translate"
    [label]="'input.work.permit.front.label' | translate"
    [showLabel]="showLabel"
    [subHeader]="'input.work.permit.front.description' | translate"
    [user]="user"
    imageType="work_permit_front"
    imageUniqueName="work_permit_front">
  </user-image-card-input>
  `
})
export class WorkPermitFrontInputComponent {
  @Input() user: User;
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
