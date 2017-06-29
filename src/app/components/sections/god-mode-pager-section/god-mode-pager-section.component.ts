import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserProxy} from '../../../proxies/user/user.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'god-mode-pager-section',
  template: `
    <basic-loader
      [promise]="actAsUser"
      class="inverted">
    </basic-loader>

    <div style="height: 100%; display: flex; flex-direction: column;">
      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="total"
        [pageSize]="pageSize">
      </numbered-pager>

      <div
        class="ui basic padded center aligned segment"
        style="flex: 1; margin: 0;">
        <basic-loader
          [promise]="users"
          class="inverted">
        </basic-loader>
        <div
          [style.flex-direction]="systemLanguage.direction === 'rtl' ? 'row-reverse': 'row'"
          class="ui centered grid">
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
            [shownUser]="user"
            *ngFor="let user of users| async; let i = index;"
            class="ui basic left aligned segment"
            style="margin: 1rem 0">
          </user-card>
        </div>
      </div>

      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="total"
        [pageSize]="pageSize">
      </numbered-pager>
    </div>`
})
export class GodModePagerSectionComponent extends BaseComponent {

  @Input("filters")
  public set filters(filters: any) {
    if (filters.sortOption && filters.filterOption && JSON.stringify(this.activeFilters) !== JSON.stringify(filters)) {
      this.page = !this.activeFilters && this.dataStoreService.getFromMemory(this.godModePageKey) || 1;
      this.activeFilters = filters;
      this.loadData();
    }
  }

  public activeFilters: any;
  public page: number = 1;
  public pageSize: number = 20;
  public total: number = 0;
  public users: Promise<User[]>;
  public actAsUser: Promise<User>;
  private readonly godModePageKey: string = 'godModePageKey';

  public constructor(
    private activatedRoute: ActivatedRoute,
    private dataStoreService: DataStoreService,
    private navigationService: NavigationService,
    private userProxy: UserProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.userResolver.deactivateGodMode();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
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
      return result.users;
    });
  }

  public onPageChange(page: number): void {
    this.page = page;
    this.dataStoreService.setInMemory(this.godModePageKey, this.page);
    this.loadData();
  }

  public activateGodmode(user: User): void {
    this.actAsUser = this.userProxy.getUser(user.id, {
      'include': UserResolver.includes
    })
    .then(user => {
      this.userResolver.activateGodMode(user);
      this.navigationService.navigate(this.JARoutes.home);
      return user;
    });
  }
}
