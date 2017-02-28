import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'input-errors',
  template: `
<input-error *ngFor="let error of formControlErrors" [label]="error"></input-error>
`
})
export class InputErrorsComponent implements OnInit {
  @Input() control: FormControl;
  @Input() patternLabel: string = null;
  @Input() requiredLabel: string = null;
  @Input() minLengthLabel: string = null;
  @Input() maxLengthLabel: string = null;

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
