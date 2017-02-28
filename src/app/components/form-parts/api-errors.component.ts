import {Component, Input} from '@angular/core';
import {ApiErrors, ApiError} from '../../models/api-errors';

@Component({
  selector: 'api-errors',
  template: `
<div
  *ngFor="let error of apiErrors"
  class="ui pointing red basic label">
  {{error.detail}}
</div>
`})
export class ApiErrorsComponent {
  @Input() private errors: ApiErrors;
  @Input() private attribute: string;

  get apiErrors(): Array<ApiError> {
    return this.errors.errorsFor(this.attribute);
  }
}
