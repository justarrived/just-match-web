import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'jobs-filter',
  styleUrls: ['./jobs-filter.component.scss'],
  template: `
    <div
      [style.direction]="systemLanguage.direction"
      class="ui stackable fluid three item menu inverted"
      style="border-radius: initial; margin: 0; justify-content: center; align-items: center; padding-bottom: 10px;">
      <div
        class="ui item"
        style="justify-content: center; align-items: center;">
        <filter-jobs-input
          (onFilterChanged)=onFilterChanged($event)
          style="width: 80%">
        </filter-jobs-input>
      </div>
    </div>`
})
export class JobsFilterComponent extends BaseComponent {
  @Output() onFiltersChanged: EventEmitter<any> = new EventEmitter<any>();
  public filterOption: string;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onFilterChanged(filterOption: any) {
    this.filterOption = filterOption;
    this.emitFilterChanges();
  }

  public emitFilterChanges() {
    this.onFiltersChanged.emit({
      filterOption: this.filterOption,
    });
  }
}
