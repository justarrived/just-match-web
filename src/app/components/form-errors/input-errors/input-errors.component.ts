import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'input-errors',
  template: `
    <div style="text-align: center">
      <api-errors
        [attribute]="apiAttribute"
        [control]="control"
        [errors]="apiErrorsActual"
        *ngIf="showApiErrors">
      </api-errors>
      <input-error
        [label]="error"
        *ngFor="let error of formControlErrors">
      </input-error>
    </div>`
})
export class InputErrorsComponent extends BaseComponent {
  @Input() public apiAttribute: string = null;
  @Input() public control: FormControl;

  @Input('apiErrors')
  public set apiErrors(errors: ApiErrors) {
    this.showApiErrors = true;
    this.apiErrorsActual = errors;
  }

  // Client side
  @Input() public maxLengthLabel: string = null;
  @Input() public minLengthLabel: string = null;
  @Input() public patternLabel: string = null;
  @Input() public requiredLabel: string = null;
  @Input() public emailLabel: string = null;

  public formControlErrors: Array<string> = [];
  public apiErrorsActual: ApiErrors = new ApiErrors([]);
  public showApiErrors: boolean = false;

  private errorLabels: any = {};

  public constructor(
    private translateService: TranslateService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.errorLabels = {
      maxlength: this.maxLengthLabel,
      minlength: this.minLengthLabel,
      pattern: this.patternLabel,
      required: this.requiredLabel,
      email: this.emailLabel
    };
    this.control.valueChanges.subscribe(() => {
      this.setErrors();
      this.showApiErrors = false;
    });
  }

  public hasErrors(): boolean {
    return this.formControlErrors.length > 0 ||
      (this.apiErrorsActual.hasErrorsFor(this.apiAttribute) && this.showApiErrors);
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
    if (controlErrors.email) {
      errors.push(this.labelFor('email', {}));
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
