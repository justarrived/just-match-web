import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';

// Component requires a route with a :page param

@Component({
  selector: 'god-mode-pager-section',
  template: `
    <sm-loader
      [promise]="actAsUser"
      class="inverted">
    </sm-loader>

    <basic-pager
      (pageChange)="onPageChange($event)"
      [currentPage]="page"
      [maxResults]="total"
      [pageSize]="pageSize">
    </basic-pager>

    <div
      class="ui basic padded center aligned segment"
      style="margin: 0; padding-bottom: 55px;">
      <sm-loader
        [promise]="users"
        class="inverted">
      </sm-loader>
      <div class="ui centered grid">
        <basic-text
          [text]="'god.mode.pager.section.no.users' | translate"
          *ngIf="(users| async)?.length == 0"
          color="black"
          fontSize="large"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
        <user-card
          (click)="activateGodmode(user)"
          [animationDelay]="50 * i"
          [user]="user"
          *ngFor="let user of users| async; let i = index;"
          class="ui basic left aligned segment"
          style="margin: 1rem 0">
        </user-card>
      </div>
    </div>

    <basic-pager
      style="position:absolute; bottom: 0; width: 100%;"
      (pageChange)="onPageChange($event)"
      [currentPage]="page"
      [maxResults]="total"
      [pageSize]="pageSize">
    </basic-pager>
    `
})
export class GodModePagerSectionComponent extends SystemLanguageListener implements OnInit {
  @Input() currentRoute: JARoute;

  @Input("filters")
  public set filters(filters: any) {
    if (filters.sortOption && filters.filterOption && JSON.stringify(this.activeFilters) !== JSON.stringify(filters)) {
      this.activeFilters = filters;
      this.page = 1;
      this.loadData()
    }
  }

  public activeFilters: any;
  public page: number = 1;
  public pageSize: number = 20;
  public total: number = 0;
  public users: Promise<User[]>;
  public actAsUser: Promise<User>;


  public constructor(
    private activatedRoute: ActivatedRoute,
    private userProxy: UserProxy,
    private userResolver: UserResolver,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.userResolver.deactivateGodMode();
  }

  protected loadData(): void {
    let searchParameters = {
      'fields[users]': 'first_name, last_name, email, phone, full_street_address, user_images',
      'include': 'user_images',
      'sort': this.activeFilters.sortOption,
      'page[number]': this.page,
      'page[size]': this.pageSize,
    };

    searchParameters[this.activeFilters.filterOption] = this.activeFilters.searchText;

    this.users = this.userProxy.getUsersWithMeta(searchParameters)
    .then(result => {
      this.total = result.meta.total;
      if (this.total === 0) {
        this.page = 0;
      }
      return result.users;
    });
  }

  public onPageChange(page: number): void {
    this.page = page;
    this.loadData();
  }

  public activateGodmode(user: User): void {
    this.actAsUser = this.userProxy.getUser(user.id, {
      'include': this.userResolver.defaultIncludeResourcesString
    })
    .then(user => {
      this.userResolver.activateGodMode(user);
      this.navigationService.navigate(JARoutes.home);
      return user;
    });
  }
}
