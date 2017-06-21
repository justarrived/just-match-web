import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'custom-radio-button-input',
  styleUrls: ['./custom-radio-button-input.component.scss'],
  template: `
    <div class="custom-radio-button-container">
      <label class="custom-radio-button-label">
        <input
          [formControl]="control"
          [name]="name"
          [value]="value"
          class="custom-radio-button-input"
          type="radio"/>
        <span class="custom-radio-button-span"></span>
        <basic-text
          [text]="label"
          fontWeight="light"
          textAlignmentLtr="center"
          textAlignmentRtl="center"
          marginBottom="0"
          marginTop="0">
        </basic-text>
      </label>
    </div>`
})
export class CustomRadioButtonInputComponent extends BaseComponent {
  @Input() public control: any;
  @Input() public label: string;
  @Input() public name: string;
  @Input() public value: string;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
