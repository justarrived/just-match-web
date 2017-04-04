import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'job-experience-input',
  template: `
  <textarea-input
    [apiErrors]="apiErrors"
    [control]="control"
    [hint]="hint"
    [label]="'input.job.experience.label' | translate"
    [placeholder]="'input.job.experience.placeholder' | translate"
    [rows]="10"
    apiAttribute="job_experience">
  </textarea-input>
  `
})
export class JobExperienceInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
}
