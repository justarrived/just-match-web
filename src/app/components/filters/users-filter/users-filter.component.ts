import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'users-filter',
  styleUrls: ['./users-filter.component.scss'],
  template: `
    <div
      [style.direction]="systemLanguage.direction"
      class="ui stackable fluid three item menu inverted"
      style="border-radius: initial; margin: 0; justify-content: center; align-items: center; padding-bottom: 10px;">
      <div
        class="ui item"
        style="justify-content: center; align-items: center;">
        <sort-users-input
          (onSortChanged)=onSortChanged($event)
          style="width: 80%">
        </sort-users-input>
      </div>
      <div
        class="ui item"
        style="justify-content: center; align-items: center;">
        <filter-users-input
          (onFilterChanged)=onFilterChanged($event)
          style="width: 80%">
        </filter-users-input>
      </div>
      <div
        class="ui item"
        style="justify-content: center; align-items: center;">
        <basic-search
          (onSearch)="onSearch($event)"
          [loading]="false"
          [label]="'users.filter.search.label' | translate"
          [placeholder]="'users.filter.search.placeholder' | translate"
          style="width: 80%">
        </basic-search>
      </div>
    </div>`
})
export class UsersFilterComponent implements OnInit, OnDestroy {
  @Output() onFiltersChanged: EventEmitter<any> = new EventEmitter<any>();
  public searchText: string;
  public sortOption: string;
  public filterOption: string;
  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public constructor(
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public ngOnInit(): void {
    this.initSystemLanguage();
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
  }

  public ngOnDestroy() {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }

  public onSearch(searchText: string) {
    this.searchText = searchText;
    this.emitFilterChanges();
  }

  public onSortChanged(sortOption: string) {
    this.sortOption = sortOption;
    this.emitFilterChanges();
  }

  public onFilterChanged(filterOption: string) {
    this.filterOption = filterOption;
    this.emitFilterChanges();
  }

  public emitFilterChanges() {
    this.onFiltersChanged.emit({
      searchText: this.searchText,
      sortOption: this.sortOption,
      filterOption: this.filterOption,
    });
  }
}
