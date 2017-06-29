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
      [searchFrequency]=searchFrequency
      [searchMemoryKey]="searchMemoryKey"
      [searchPersistKey]="searchPersistKey">
    </search-input>`
})
export class BasicSearchComponent extends BaseComponent {
  @Input() public label: string;
  @Input() public loading: boolean;
  @Input() public placeholder: string;
  @Input() public searchFrequency: number = 500;
  @Input() public searchMemoryKey: string;
  @Input() public searchPersistKey: string;
  @Output() public onSearch: EventEmitter<string> = new EventEmitter<string>();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
