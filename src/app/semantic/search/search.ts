import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

/**
 * <sm-search placeholder="Search..." (onSearch)="element.innerText = $event" ></sm-search>
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "sm-search",
  template: `
  <div
    class="field">
    <label
      *ngIf="label">
      {{label}}
    </label>
    <div
      [ngClass]="{'loading': loading}"
      class="ui search">
      <div
        class="ui icon input {{class}} ">
        <input
          [attr.placeholder]="placeholder"
          [formControl]="searchControl"
          class="prompt"
          type="text">
        <i
          *ngIf="icon"
          class="search icon">
        </i>
      </div>
      <div class="results"></div>
    </div>
  </div>`
})
export class SemanticSearchComponent implements AfterViewInit {
  @Input() class: string;
  @Input() icon: boolean;
  @Input() label: string;
  @Input() loading: boolean;
  @Input() placeholder: string;
  @Input() searchFrequency: number = 0;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  searchControl: FormControl = new FormControl();

  ngAfterViewInit() {
    this.searchControl
      .valueChanges
      .distinctUntilChanged()
      .debounceTime(this.searchFrequency)
      .subscribe((data: string) => this.onSearch.emit(data));
  }
}
