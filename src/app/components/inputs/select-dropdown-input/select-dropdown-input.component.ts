import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {getNestedProperty} from '../../../utils/object/object.util';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'select-dropdown-input',
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      [style.padding-bottom]="paddingBottom"
      class="field">
      <select-input
       [control]="control"
       [data]="data"
       [label]="label"
       [multiple]="multiple"
       [multipleResults]="multipleResults"
       [options]="options"
       [placeholder]="placeholder"
       [selectedMemoryKey]="selectedMemoryKey"
       [selectedPersistKey]="selectedPersistKey"
       (onChange)="change($event)"
       class="search">
        <option
          style="text-align: right; direction: rtl;"
          [value]='getNestedProperty(item, dataItemValueProperty)'
          *ngFor="let item of data">
          <!-- Has to be pre translated in API or via TranslateService. Pipe wont work properly here.-->
          {{getNestedProperty(item, dataItemLabelProperty)}}
        </option>
      </select-input>
      <input-errors
        [apiAttribute]="apiAttribute"
        [apiErrors]="apiErrors"
        [control]="control"
        [maxLengthLabel]="maxLengthLabel"
        [minLengthLabel]="minLengthLabel"
        [patternLabel]="patternLabel"
        [requiredLabel]="requiredLabel">
      </input-errors>
      <input-hint-label [hint]="hint"></input-hint-label>
      <ng-content></ng-content>
    </div>`
})
export class SelectDropdownInputComponent extends BaseComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public data: any[];
  @Input() public dataItemLabelProperty: string;
  @Input() public dataItemValueProperty: string;
  @Input() public fluid: boolean = true;
  @Input() public hint: string;
  @Input() public label: string;
  @Input() public multiple: boolean = false;
  @Input() public multipleResults: any[] = [];
  @Input() public maxLengthLabel: string;
  @Input() public minLengthLabel: string;
  @Input() public options: any;
  @Input() public paddingBottom: string = '1em';
  @Input() public patternLabel: string;
  @Input() public placeholder: string;
  @Input() public requiredLabel: string;
  @Input() public selectedMemoryKey: string;
  @Input() public selectedPersistKey: string;
  @Output() public onChange = new EventEmitter();
  @ViewChild(InputErrorsComponent) inputErrors: InputErrorsComponent;
  public getNestedProperty = getNestedProperty;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public change(value): void {
    this.onChange.emit(value);
  }
}
