import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Input} from "@angular/core";
import {OnInit} from "@angular/core";
import {Output} from "@angular/core";
import {ViewContainerRef} from "@angular/core";

@Component({
  selector: "sm-input",
  template: `
    <div
      class="field"
      [ngClass]="{error: (!control.valid && control.dirty) }">
      <label
        *ngIf="label">
        {{label}}
      </label>
      <div
        class="ui input {{class}}"
        [ngClass]="{'icon': icon}">
        <input
          (keyup.enter)="onEnterKeyUp.emit()"
          [type]="type"
          [formControl]="control"
          #input placeholder="{{placeholder}}">
        <i
          *ngIf="icon"
          class="{{icon}} icon">
        </i>
      </div>
    </div>`
})
export class SemanticInputComponent {
  @Input() public class: string;
  @Input() public control: FormControl = new FormControl();
  @Input() public icon: string;
  @Input() public label: string;
  @Input() public model: {};
  @Input() public placeholder: string;
  @Input() public type: string = "text";
  @Output() public onEnterKeyUp: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "sm-checkbox",
  template: `
    <div
      class="field"
      [ngClass]="{error: (!control.value && control?.validator) }">
      <div class="ui {{classType}} checkbox">
        <input
          [formControl]="control"
          [id]="uniqueId"
          [name]="name"
          [type]="inputType"
          [value]="value"
          tabindex="0"
          type="checkbox">
        <label
          [for]="uniqueId"
          *ngIf="label"
          style="cursor: pointer">
          {{label}}
        </label>
      </div>
    </div>`
})
export class SemanticCheckboxComponent {
  @Input() public control: FormControl = new FormControl();
  @Input() public label: string;
  @Input() public name: string;
  @Input() public uniqueId: string;
  @Input() public value: string | number;

  @Input("type")
  public set type(data: string) {
    if (data && data !== "checkbox") {
      this.classType = data;
      if (data === "radio") {
        this.inputType = data;
      }
    }
  }

  public inputType: string = "checkbox";
  public classType = "checkbox";
}

@Component({
  selector: "sm-textarea",
  template: `
    <div
      [ngClass]="{error: (!control.valid && control.dirty) }"
      class="field">
      <label
        *ngIf="label">
        {{label}}
      </label>
      <textarea
        (keyup.enter)="onEnterKeyUp.emit()"
        [formControl]="control"
        [placeholder]="placeholder"
        [rows]="rows"
        autosize
        style="resize: none;">
      </textarea>
    </div>`
})
export class SemanticTextareaComponent {
  @Input() public autofocus: boolean;
  @Input() public control: FormControl = new FormControl();
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public rows: string;
  @Output() public onEnterKeyUp: EventEmitter<any> = new EventEmitter<any>();
}
