import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/user/user';

@Component({
  selector: 'personal-id-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.personal.id.header' | translate"
    [label]="'input.personal.id.label' | translate"
    [showLabel]="showLabel"
    [subHeader]="'input.personal.id.description' | translate"
    imageField="personalIdImage"
    imageType="personal_id">
  </user-image-card-input>
  `
})
export class PersonalIDInputComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
