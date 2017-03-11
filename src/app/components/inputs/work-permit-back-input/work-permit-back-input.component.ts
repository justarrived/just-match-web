import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'work-permit-back-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.work.permit.back.header' | translate"
    [label]="'input.work.permit.back.label' | translate"
    [showLabel]="showLabel"
    [subHeader]="'input.work.permit.back.description' | translate"
    [user]="user"
    imageType="work_permit_back"
    imageUniqueName="work_permit_back">
  </user-image-card-input>
  `
})
export class WorkPermitBackInputComponent {
  @Input() user: User;
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
