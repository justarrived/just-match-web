import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'basic-search',
  template: `
    <search-input
      (onSearch)="onSearch.emit($event)"
      [icon]="true"
      [label]="label"
      [loading]="loading"
      [placeholder]="placeholder"
      [searchFrequency]=searchFrequency>
    </search-input>`
})
export class BasicSearchComponent extends BaseComponent {
  @Input() label: string;
  @Input() loading: boolean;
  @Input() placeholder: string;
  @Input() searchFrequency: number = 500;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
