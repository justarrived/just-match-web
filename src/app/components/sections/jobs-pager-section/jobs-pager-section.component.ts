import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
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
    if (JSON.stringify(this.activeFilters) !== JSON.stringify(filters)) {
      this.activeFilters = filters;
      this.page = 1;
      this.loadData()
    }
  }

  public activeFilters: any;
  public jobsMetaPromise: Promise<{jobs: Job[], meta: any}>;
  public page: number = 1;
  public pageSize: number = 12;
  public totalJobs: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
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
      'include': 'company,hourly_pay,company.company_images',
      'page[number]': this.page,
      'page[size]': this.pageSize
    };

    for (let filter in this.activeFilters.filterOption) {
      searchParameters[filter] = this.activeFilters.filterOption[filter];
    }

    this.jobsMetaPromise = this.jobProxy.getJobsWithMeta(searchParameters)
    .then(result => {
      this.totalJobs = result.meta.total;
      if (this.totalJobs === 0) {
        this.page = 1;
      }
      return result;
    });
  }

  public onPageChange(page: number): void {
    this.page = page;
    this.loadData();
  }
}
