import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {GodModePagerSectionComponent} from '../../sections/god-mode-pager-section/god-mode-pager-section.component';
import {Inject} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Meta} from '@angular/platform-browser';
import {PageOptionsService} from '../../../services/page-options.service';
import {PageComponent} from '../page.component';
import {REQUEST} from '../../../../express-engine';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  template: `
    <div style="height: 100%; display: flex; flex-direction: column;">
      <basic-border-section
        [header]="'god.mode.title' | translate: {numberOfUsers: godModeUsersSectionComponent.total}"
        icon="search">
      </basic-border-section>

      <users-filter (onFiltersChanged)="onFiltersChanged($event)"></users-filter>

      <div style="flex: 1;">
        <god-mode-pager-section
          [filters]="activeFilters"
          #godModeUsersSectionComponent>
        </god-mode-pager-section>
      </div>
    </div>`
})
export class GodModePageComponent extends PageComponent {

  @ViewChild('godModeUsersSectionComponent') public godModeUsersSectionComponent : GodModePagerSectionComponent;

  public activeFilters: any = {};

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    protected meta: Meta,
    protected pageOptionsService: PageOptionsService,
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
      pageOptionsService,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver
    );
  }

  public onFiltersChanged(filters: {searchText: string, sortOption: string, filterOption: string}): void {
    this.activeFilters = filters;
  }
}
