import {ActivatedRoute} from '@angular/router';
import {Application} from '../../../models/api-models/application/application';
import {ApplicationProxy} from '../../../proxies/application/application.proxy';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'applications-pager-section',
  template: `
    <div style="height: 100%; display: flex; flex-direction: column;">
      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalApplications"
        [pageSize]="pageSize"
        type="light">
      </numbered-pager>

      <div
        class="ui basic center aligned segment"
        style="margin: 0; padding: 0;">
        <basic-title-text
          [iconLeft]="icon"
          [text]="'menu.main.my_assignment' | translate"
          color="black"
          fontSize="large"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center"
          underlineBelow="true"
          underlineBelowLtrAlignment="center"
          underlineBelowRtlAlignment="center">
        </basic-title-text>
      </div>

      <div
        class="ui basic center aligned segment"
        style="flex: 1; margin: 0;">
        <basic-loader
          [promise]="applicationsMetaPromise"
          class="inverted">
        </basic-loader>
        <div
          [style.flex-direction]="systemLanguage.direction === 'rtl' ? 'row-reverse': 'row'"
          class="ui centered grid">
          <job-card
            [animationDelay]="50 * i"
            [application]="application"
            [job]="application.job"
            *ngFor="let application of (applicationsMetaPromise | async)?.applications; let i = index;"
            class="ui basic left aligned segment"
            style="margin: 1rem 0">
          </job-card>
        </div>
      </div>

      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalApplications"
        [pageSize]="pageSize"
        type="light">
      </numbered-pager>
    </div>`
})
export class ApplicationsPagerSectionComponent extends BaseComponent {

  public applicationsMetaPromise: Promise<{applications: Application[], meta: any}>;
  public page: number = 1;
  public totalApplications: number = 0;
  public readonly pageSize: number = 12;
  private readonly applicationsPageKey: string = 'applicationsPageKey';

  public constructor(
    private activatedRoute: ActivatedRoute,
    private applicationProxy: ApplicationProxy,
    private dataStoreService: DataStoreService,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.page = this.dataStoreService.getFromMemory(this.applicationsPageKey) || 1;
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData(): void {
    let searchParameters = {
      'include': 'job,job.company,job.company.company_images',
      'page[number]': this.page,
      'page[size]': this.pageSize,
      'sort': '-created_at',
    };

    this.applicationsMetaPromise = this.applicationProxy.getUserApplicationsWithMeta(this.user.id, searchParameters)
    .then(result => {
      this.totalApplications = result.meta.total;
      return result;
    });
  }

  public onPageChange(page: number): void {
    this.page = page;
    this.dataStoreService.setInMemory(this.applicationsPageKey, this.page);
    this.loadData();
  }
}
