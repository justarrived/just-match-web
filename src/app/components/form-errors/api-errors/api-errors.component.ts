import {ApiError} from '../../../models/api-models/api-errors/api-errors';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'api-errors',
  template: `
    <div
      *ngFor="let error of apiErrors"
      class="ui pointing red basic label">
      {{error.detail}}
    </div>`
})
export class ApiErrorsComponent extends BaseComponent {
  @Input() public errors: ApiErrors;
  @Input() public attribute: string;
  @Input() public control: FormControl;

  public get apiErrors(): Array<ApiError> {
    return this.errors.errorsFor(this.attribute);
  }

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
