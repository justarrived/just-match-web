import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {AfterViewInit} from "@angular/core";
import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Input} from "@angular/core";
import {Output} from "@angular/core";

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
  @Input() public class: string;
  @Input() public icon: boolean;
  @Input() public label: string;
  @Input() public loading: boolean;
  @Input() public placeholder: string;
  @Input() public searchFrequency: number = 0;
  @Output() public onSearch: EventEmitter<string> = new EventEmitter<string>();

  public searchControl: FormControl = new FormControl();

  public ngAfterViewInit(): void {
    this.searchControl
      .valueChanges
      .distinctUntilChanged()
      .debounceTime(this.searchFrequency)
      .subscribe((data: string) => this.onSearch.emit(data));
  }
}
