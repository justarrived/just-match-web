import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {ElementRef} from '@angular/core';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'number-input',
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      [style.padding-bottom]="paddingBottom"
      class="field">
      <basic-text
        [text]="label"
        *ngIf="label"
        fontSize="small"
        fontWeight="bold"
        marginBottom="0"
        marginTop="0">
      </basic-text>
      <div
        class="ui input"
        [ngClass]="{'left': icon && systemLanguage.direction === 'ltr', 'right': icon && systemLanguage.direction === 'rtl', 'icon': icon}">
        <input
          [class.arabic-font]="systemLanguage.direction === 'rtl'"
          [formControl]="control"
          [max]="max"
          [min]="min"
          [style.direction]="systemLanguage.direction"
          [style.text-align]="systemLanguage.direction === 'ltr' ? 'left' : 'right'"
          #input
          placeholder="{{placeholder}}"
          type="number">
        <i
          *ngIf="icon"
          class="{{icon}} icon">
        </i>
      </div>
      <input-errors
        [apiAttribute]="apiAttribute"
        [apiErrors]="apiErrors"
        [control]="control"
        [requiredLabel]="requiredLabel">
      </input-errors>
      <input-hint-label [hint]="hint"></input-hint-label>
      <ng-content></ng-content>
    </div>`
})
export class NumberInputComponent extends BaseComponent  {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public hint: string;
  @Input() public icon: string;
  @Input() public label: string;
  @Input() public max: number = 100;
  @Input() public min: number = 1;
  @Input() public paddingBottom: string = '1em';
  @Input() public placeholder: string;
  @Input() public requiredLabel: string;
  @Input() public type: string = 'text';
  @ViewChild(InputErrorsComponent) public inputErrors: InputErrorsComponent;
  @ViewChild("input") public inputRef: ElementRef;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
