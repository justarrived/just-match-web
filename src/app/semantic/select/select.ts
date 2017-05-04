import {
  Component, Input, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectionStrategy
} from "@angular/core";
import { FormControl } from "@angular/forms";

declare var jQuery: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "sm-select",
  template: `
    <div
      class="field"
      [ngClass]="{error: (!control?.valid && control?.touched) }">
      <label
        *ngIf="label">
        {{label}}
      </label>
      <select
        [formControl]="control"
        class="ui {{class}} dropdown"
        #select>
        <option
          value="">
          {{placeholder}}
        </option>
        <ng-content></ng-content>
      </select>
    </div>`
})
export class SemanticSelectComponent implements AfterViewInit {
  @Input() public control: FormControl = new FormControl();
  @Input() public class: string;
  @Input() public label: string;
  @Input() public options: {} = {};
  @Input() public placeholder: string;
  @Output() public modelChange: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Output() public onChange: EventEmitter<string | number> = new EventEmitter<string | number>();
  @ViewChild("select") public select: ElementRef;

  @Input("disabled")
  public set disabled(data: boolean) {
    setTimeout(() => {
      if (data) {
        jQuery(this.select.nativeElement.parentNode).addClass("disabled");
      } else {
        jQuery(this.select.nativeElement.parentNode).removeClass("disabled");
      }
    }, 1);
  };

  @Input("data")
  public set data(data: any) {
    if (data && this.control.value) {
      setTimeout(() => {
        jQuery(this.select.nativeElement).dropdown("set selected", this.control.value);
      }, 1);
    }
  }

  @Input("model")
  public set model(data: string | number) {
    if (data) {
      setTimeout(() => {
        jQuery(this.select.nativeElement).dropdown("set selected", data);
      }, 1);
    }
  }

  private multiple: boolean = false;

  public ngAfterViewInit(): void {

    if (typeof this.class === "string" && this.class.search("multiple") >= 0) {
      this.select.nativeElement.setAttribute("multiple", true);
    }

    const options: {} = Object.assign({
      onChange: (value: string | number) => {
        this.modelChange.emit(value);
        this.onChange.emit(value);
      },
      onHide: () => this.control.markAsTouched()
    }, this.options);

    jQuery(this.select.nativeElement)
      .dropdown(options);
  }
}
