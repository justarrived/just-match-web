import {ActivatedRoute} from '@angular/router';
import {Application} from '../../../models/api-models/application/application';
import {Component} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  template: `
    <sm-loader
      [promise]="jobPromise"
      class="inverted">
    </sm-loader>

    <div *ngIf="job">
      <job-actions-header
        [(application)]="application"
        [job]="job">
      </job-actions-header>

      <div class="ui centered grid">
        <div class="sixteen wide phone twelve wide tablet ten wide computer column">
          <job-information-section [job]="job"></job-information-section>

          <div class="ui divider"></div>

          <job-description-section [job]="job"></job-description-section>

          <div class="ui divider"></div>

          <job-scope-section [job]="job"></job-scope-section>

          <div class="ui divider"></div>

          <job-location-section [job]="job"></job-location-section>

          <div class="ui divider"></div>

          <job-actions-section
            [(application)]="application"
            [job]="job">
          </job-actions-section>

          <div class="ui divider"></div>

          <job-comments-section [job]="job"></job-comments-section>
        </div>
      </div>
    </div>`
})
export class JobPageComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  public application: Application;
  public job: Job;
  public jobId: string;
  public jobPromise: Promise<Job>;

  private routeParamsSubscription: Subscription;

  public constructor(
    private jobProxy: JobProxy,
    private route: ActivatedRoute,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.initRouteParamsSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.jobId = params['id'];
      this.loadData();
    });
  }

  protected loadData(): void {
    this.jobPromise = this.jobProxy.getJob(this.jobId, {
      'include': 'owner,company,hourly_pay,company.company_images,comments'
    })
    .then(job => {
      this.job = job;
      return job;
    })
  }

  public ngOnDestroy(): void {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }
}
