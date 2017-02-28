import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {ApiErrors} from '../../models/api-errors';

@Component({
  selector: 'input-errors',
  template: `
<api-errors [control]="control" [errors]="apiErrors" [attribute]="apiAttributeName"></api-errors>
<input-error *ngFor="let error of formControlErrors" [label]="error"></input-error>
`
})
export class InputErrorsComponent implements OnInit {
  @Input() private controls: any;
  @Input() private attribute: string;
  @Input() private apiAttribute: string = null;
  @Input() private apiErrors: ApiErrors = new ApiErrors([]);

  // Client side
  @Input() private patternLabel: string = null;
  @Input() private requiredLabel: string = null;
  @Input() private minLengthLabel: string = null;
  @Input() private maxLengthLabel: string = null;

  formControlErrors: Array<string> = [];

  private errorLabels: any = {};

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.errorLabels = {
      pattern: this.patternLabel,
      required: this.requiredLabel,
      minlength: this.minLengthLabel,
      maxlength: this.maxLengthLabel
    };
    this.control.valueChanges.subscribe(() => this.setErrors());
  }

  private get control(): FormControl {
    return this.controls[this.attribute] || new Error('Unknown attriubte: ' + this.attribute);
  }

  private get apiAttributeName(): string {
    return this.apiAttribute || this.attribute;
  }

  private setErrors(): void {
    const errors: Array<string> = [];
    let interpolationData: any = {};
    const controlErrors: any = this.control.errors;
    if (controlErrors === null || this.control.pristine) {
      this.resetErrors();
      return;
    }

    if (controlErrors.pattern) {
      errors.push(this.labelFor('pattern', {}));
    }
    if (controlErrors.required) {
      errors.push(this.labelFor('required', {}));
    }
    if (controlErrors.minlength) {
      errors.push(this.labelFor('minlength', { minLength: controlErrors.minlength.requiredLength }));
    }
    if (controlErrors.maxlength) {
      errors.push(this.labelFor('maxlength', { maxLength: controlErrors.maxlength.requiredLength }));
    }

    this.setControlErrors(errors);
  }

  private setControlErrors(errors: Array<string>) {
    this.formControlErrors = errors;
  }

  private resetErrors(): void {
    this.formControlErrors = [];
  }

  private labelFor(type: string, data: any): string {
    if (this.errorLabels[type]) return this.errorLabels[type];

    return this.translateService.instant('validations.' + type, data);
  }
}
