import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/api-models/user/user';

@Component({
  selector: 'work-permit-back-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.work.permit.back.header' | translate"
    [label]="'input.work.permit.back.label' | translate"
    [showLabel]="showLabel"
    [description]="'input.work.permit.back.description' | translate"
    imageField="workPermitBackImage"
    imageType="work_permit_back">
  </user-image-card-input>
  `
})
export class WorkPermitBackInputComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
