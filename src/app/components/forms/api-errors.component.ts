import {ApiError} from '../../models/api-errors';
import {ApiErrors} from '../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'api-errors',
  template: `
  <div
    *ngFor="let error of apiErrors"
    class="ui pointing red basic label">
    {{error.detail}}
  </div>`
})
export class ApiErrorsComponent implements OnInit {
  @Input() public errors: ApiErrors;
  @Input() public attribute: string;
  @Input() public control: FormControl;

  public ngOnInit(): void {
    if (this.control) {
      // Clear errors when value changes
      this.control.valueChanges.subscribe(() => {
        this.errors.resetErrorsFor(this.attribute);
      });
    }
  }

  public get apiErrors(): Array<ApiError> {
    return this.errors.errorsFor(this.attribute);
  }
}
