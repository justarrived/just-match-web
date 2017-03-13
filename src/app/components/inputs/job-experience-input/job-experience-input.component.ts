import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';

@Component({
  selector: 'job-experience-input',
  template: `
  <textarea-input
    [apiErrors]="apiErrors"
    [control]="control"
    [label]="'input.job.experience.label' | translate"
    [placeholder]="'input.job.experience.placeholder' | translate"
    [rows]="10"
    apiAttribute="job_experience">
  </textarea-input>
  `
})
export class JobExperienceInputComponent {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;
}
