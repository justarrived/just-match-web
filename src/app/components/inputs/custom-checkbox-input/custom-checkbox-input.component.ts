import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'custom-checkbox-input',
  styleUrls: ['./custom-checkbox-input.component.scss'],
  template: `
    <div class="ui checked checkbox">
      <input
        [id]="checkboxId"
        [formControl]="control"
        [name]="name"
        (change)="onChange()"
        class="custom-checkbox-input"
        type="checkbox"
        checked="" />

      <label [for]="checkboxId">{{label}}</label>
    </div>
    `
})
export class CustomCheckboxInputComponent extends BaseComponent {
  @Input() public control: any = new FormControl();
  @Input() public label: string;
  @Input() public checkboxId: string;
  @Input() public name: string;
  @Input() public resultObject: any = {};
  @Input() public value: string;
  @Output() public resultObjectChange: EventEmitter<any> = new EventEmitter<any>();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    if (this.resultObject[this.value]) {
      this.control.setValue(true);
    } else {
      this.onChange();
    }
  }

  public onChange() {
    this.resultObject[this.value] = this.control.value;
    this.resultObjectChange.emit(this.resultObject);
  }
}
