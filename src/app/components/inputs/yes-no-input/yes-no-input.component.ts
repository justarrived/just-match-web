import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'yes-no-input',
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      [style.text-align]="systemLanguage.direction === 'ltr' ? 'left' : 'right'"
      class="field">
      <basic-text
        [text]="label"
        *ngIf="label"
        fontSize="small"
        fontWeight="bold"
        marginBottom="20px"
        marginTop="0">
      </basic-text>
      <custom-radio-button-input
        [control]="control"
        [label]="'common.yes' | translate"
        [name]="name"
        value="yes">
      </custom-radio-button-input>
      <custom-radio-button-input
        [control]="control"
        [label]="'common.no' | translate"
        [name]="name"
        value="no">
      </custom-radio-button-input>
      <input-errors
        [apiAttribute]="apiAttribute"
        [apiErrors]="apiErrors"
        [control]="control"
        [requiredLabel]="requiredLabel">
      </input-errors>
      <input-hint-label [hint]="hint"></input-hint-label>
    </div>`
})
export class YesNoInputComponent extends BaseComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
  @Input() public label: string;
  @Input() public name: string;
  @Input() public requiredLabel: string;
  @ViewChild(InputErrorsComponent) inputErrors: InputErrorsComponent;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
