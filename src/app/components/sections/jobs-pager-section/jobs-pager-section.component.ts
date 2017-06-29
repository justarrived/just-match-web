import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {Input} from '@angular/core';
import {isEmpty} from 'lodash';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {Language} from '../../../models/api-models/language/language';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'jobs-pager-section',
  template: `
    <div style="height: 100%; display: flex; flex-direction: column;">
      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalJobs"
        [pageSize]="pageSize">
      </numbered-pager>

      <div
        class="ui basic center aligned segment"
        style="flex: 1; margin: 0;">
        <basic-loader
          [promise]="jobsMetaPromise"
          class="inverted">
        </basic-loader>
        <div
          [style.flex-direction]="systemLanguage.direction === 'rtl' ? 'row-reverse': 'row'"
          class="ui centered grid">
          <basic-text
            [text]="'jobs.pager.section.no.jobs' | translate"
            *ngIf="(jobsMetaPromise| async)?.jobs?.length === 0"
            color="black"
            fontSize="large"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
          <job-card
            [animationDelay]="50 * i"
            [job]="job"
            *ngFor="let job of (jobsMetaPromise | async)?.jobs; let i = index;"
            class="ui basic left aligned segment"
            style="margin: 1rem 0">
          </job-card>
        </div>
      </div>

      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalJobs"
        [pageSize]="pageSize">
      </numbered-pager>
    </div>`
})
export class JobsPagerSectionComponent extends BaseComponent {

  @Input("filters")
  public set filters(filters: any) {
    if (!isEmpty(filters) && JSON.stringify(this.activeFilters) !== JSON.stringify(filters)) {
      this.page = !this.activeFilters && this.dataStoreService.getFromMemory(this.jobsPageKey) || 1;
      this.dataStoreService.setInMemory(this.jobsPageKey, this.page);
      this.activeFilters = filters;
      this.loadData();
    }
  }

  public activeFilters: any;
  public jobsMetaPromise: Promise<{jobs: Job[], meta: any}>;
  public page: number = 1;
  public totalJobs: number = 0;
  public readonly pageSize: number = 12;
  private readonly jobsPageKey: string = 'jobsPageKey';

  public constructor(
    private activatedRoute: ActivatedRoute,
    private dataStoreService: DataStoreService,
    private jobProxy: JobProxy,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData(): void {
    let searchParameters = {
      'include': 'company,company.company_images',
      'page[number]': this.page,
      'page[size]': this.pageSize
    };

    for (let filter in this.activeFilters.filterOption) {
      searchParameters[filter] = this.activeFilters.filterOption[filter];
    }

    this.jobsMetaPromise = this.jobProxy.getJobsWithMeta(searchParameters)
    .then(result => {
      this.totalJobs = result.meta.total;
      return result;
    });
  }

  public onPageChange(page: number): void {
    this.page = page;
    this.dataStoreService.setInMemory(this.jobsPageKey, this.page);
    this.loadData();
  }
}
