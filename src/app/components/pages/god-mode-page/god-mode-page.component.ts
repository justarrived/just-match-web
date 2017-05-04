import {Component} from '@angular/core';
import {GodModePagerSectionComponent} from '../../sections/god-mode-pager-section/god-mode-pager-section.component';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {ViewChild} from '@angular/core';

@Component({
  template: `
    <basic-border-header
      [header]="'god.mode.title' | translate: {numberOfUsers: godModeUsersSectionComponent.total}"
      icon="search">
    </basic-border-header>

    <users-filter (onFiltersChanged)="onFiltersChanged($event)"></users-filter>

    <god-mode-pager-section
      [currentRoute]="JARoutes.godMode"
      [filters]="activeFilters"
      #godModeUsersSectionComponent>
    </god-mode-pager-section>`
})
export class GodModePageComponent {
  @ViewChild('godModeUsersSectionComponent') public godModeUsersSectionComponent : GodModePagerSectionComponent;

  public activeFilters: any = {};
  public JARoutes = JARoutes;

  public onFiltersChanged(filters: {searchText: string, sortOption: string, filterOption: string}): void {
    this.activeFilters = filters;
  }
}
