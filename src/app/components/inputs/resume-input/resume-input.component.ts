import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/user/user';

@Component({
  selector: 'resume-input',
  template: `
  <user-document-card-input
    [centered]="centered"
    [header]="'input.resume.header' | translate"
    [label]="'input.resume.label' | translate"
    [maxNbrDocuments]="5"
    [showLabel]="showLabel"
    [subHeader]="'input.resume.subheader' | translate"
    documentType="cv">
  </user-document-card-input>
  `
})
export class ResumeInputComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
