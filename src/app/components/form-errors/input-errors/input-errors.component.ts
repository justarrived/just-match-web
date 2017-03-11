import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'input-errors',
  template: `
    <api-errors
      [control]="control"
      [errors]="apiErrors"
      [attribute]="apiAttribute">
    </api-errors>
    <input-error
      *ngFor="let error of formControlErrors"
      [label]="error">
    </input-error>`
})
export class InputErrorsComponent implements OnInit {
  @Input() public apiAttribute: string = null;
  @Input() public apiErrors: ApiErrors = new ApiErrors([]);
  @Input() public control: FormControl;

  // Client side
  @Input() public maxLengthLabel: string = null;
  @Input() public minLengthLabel: string = null;
  @Input() public patternLabel: string = null;
  @Input() public requiredLabel: string = null;

  public formControlErrors: Array<string> = [];

  private errorLabels: any = {};

  constructor(
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.errorLabels = {
      maxlength: this.maxLengthLabel,
      minlength: this.minLengthLabel,
      pattern: this.patternLabel,
      required: this.requiredLabel
    };
    this.control.valueChanges.subscribe(() => this.setErrors());
  }

  public hasErrors(): boolean {
    return this.formControlErrors.length > 0 || this.apiErrors.hasErrorsFor(this.apiAttribute);
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
