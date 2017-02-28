import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
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
export class ApiErrorsComponent implements OnInit {
  @Input() private errors: ApiErrors;
  @Input() private attribute: string;
  @Input() private control: FormControl;

  ngOnInit(): void {
    if (this.control) {
      // Clear errors when touched
      this.control.valueChanges.subscribe(() => {
        if (this.control.touched) {
          this.errors.resetErrorsFor(this.attribute);
        }
      });
    }
  }

  get apiErrors(): Array<ApiError> {
    return this.errors.errorsFor(this.attribute);
  }
}
