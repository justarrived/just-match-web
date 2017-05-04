import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';

@Component({
  selector: 'basic-search',
  template: `
    <sm-search
      (onSearch)="onSearch.emit($event)"
      [icon]="true"
      [label]="label"
      [loading]="loading"
      [placeholder]="placeholder"
      [searchFrequency]=searchFrequency>
    </sm-search>`
})
export class BasicSearchComponent {
  @Input() label: string;
  @Input() loading: boolean;
  @Input() placeholder: string;
  @Input() searchFrequency: number = 500;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
}
