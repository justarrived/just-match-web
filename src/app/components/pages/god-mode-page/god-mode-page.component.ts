import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {GodModePagerSectionComponent} from '../../sections/god-mode-pager-section/god-mode-pager-section.component';
import {Inject} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';
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
export class GodModePageComponent extends PageComponent {

  @ViewChild('godModeUsersSectionComponent') public godModeUsersSectionComponent : GodModePagerSectionComponent;

  public activeFilters: any = {};
  public JARoutes = JARoutes;

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    protected meta: Meta,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected translateService: TranslateService,
    protected userResolver: UserResolver,
  ) {
    super(
      {
        title: {
          translate: true,
          content: 'meta.god.mode.title'
        },
        description: {
          translate: true,
          content: 'meta.god.mode.description'
        }
      },
      document,
      meta,
      systemLanguagesResolver,
      translateService,
      userResolver
    );
  }

  public onFiltersChanged(filters: {searchText: string, sortOption: string, filterOption: string}): void {
    this.activeFilters = filters;
  }
}
