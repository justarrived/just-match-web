import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {Job} from '../../models/api-models/job/job';
import {JobProxy} from '../../proxies/job/job.proxy';
import {Location} from '@angular/common';
import {nbrOfMonthsFromDate} from '../../utils/date/date.util';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {yyyymmdd} from '../../utils/date/date.util';

@Component({
  styleUrls: ['./jobs.component.scss'],
  template: `
    <basic-border-header
      [header]="'jobs.title' | translate: {nbrOfJobs: totalJobs}"
      icon="search">
    </basic-border-header>

    <jobs-map></jobs-map>

    <pager [maxResults]="totalJobs" [currentPage]="page" (pageChange)="onPageChange($event)"></pager>

    <div class="jobs-list-container ui form">
      <sm-loader
        [complete]="!loadingJobs"
        class="inverted">
      </sm-loader>
      <div class="jobs-list-item-container" *ngIf="!loadingJobs">
        <job-list-item class="jobs-list-item" *ngFor="let job of jobs" [job]="job"></job-list-item>
      </div>
    </div>

    <pager [maxResults]="totalJobs" [currentPage]="page" (pageChange)="onPageChange($event)"></pager>`
})
export class JobsComponent extends SystemLanguageListener implements OnInit {
  public jobs: Job[];
  public totalJobs: number = 0;
  public page: number = 1;
  public pageSize: number = 10;
  public loadingJobs: boolean = true;

  constructor(
    private jobProxy: JobProxy,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.page = params['page'] && parseInt(params['page']);
      if (!this.page || this.page < 1) {
        this.location.replaceState('/jobs/' + 1);
        this.page = 1;
      }
      this.loadData();
    });
  }

  loadData() {
    this.loadingJobs = true;
    this.jobProxy.getJobsWithMeta({
      'include': 'company,hourly_pay,company.company_images',
      'filter[filled]': false,
      'filter[job_date]': yyyymmdd(new Date()) + '..' + yyyymmdd(nbrOfMonthsFromDate(new Date(), 12)),
      'sort': 'job_date',
      'page[number]': this.page
    })
    .then(result => {
      this.jobs = result.jobs;
      this.totalJobs = result.meta.total;
      this.loadingJobs = false;
      if (this.pageSize * (this.page - 1) > this.totalJobs) {
        this.onPageChange(1);
      } else if (this.totalJobs === 0) {
        this.page = 0;
      }
    });
  }

  onPageChange(page) {
    this.location.replaceState('/jobs/' + page);
    this.page = page;
    this.loadData();
  }
}
