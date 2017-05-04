import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {Output} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'textarea-input',
  template: `
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      class="field"
      [style.padding-bottom]="paddingBottom">
      <sm-textarea
        (onEnterKeyUp)="onEnterKeyUp.emit()"
        [control]="control"
        [label]="label"
        [placeholder]="placeholder"
        [rows]=rows>
      </sm-textarea>
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
export class TextareaInputComponent {
  @Input() public apiAttribute: string;
  @Input() public apiErrors: any;
  @Input() public control: any;
  @Input() public hint: string;
  @Input() public label: string;
  @Input() public rows: number = 10;
  @Input() public maxLengthLabel: string;
  @Input() public minLengthLabel: string;
  @Input() public paddingBottom: string = '1em';
  @Input() public patternLabel: string;
  @Input() public placeholder: string;
  @Input() public requiredLabel: string;
  @Output() onEnterKeyUp: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(InputErrorsComponent) inputErrors: InputErrorsComponent;
}
