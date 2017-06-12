import {ActivatedRoute} from '@angular/router';
import {Application} from '../../../models/api-models/application/application';
import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {Language} from '../../../models/api-models/language/language';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {REQUEST} from '../../../../express-engine';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  styleUrls: ['./job-page.component.scss'],
  template: `
    <sm-loader
      [promise]="jobPromise"
      class="inverted">
    </sm-loader>

    <div *ngIf="job">
      <job-banner-section
        [(application)]="application"
        [job]="job">
      </job-banner-section>

      <div
        class="ui grid job-page-grid"
        [style.direction]="systemLanguage.direction">

        <div class="sixteen wide mobile only column">
          <job-actions-section
            [(application)]="application"
            [job]="job"
            [hideReadMore]="true"
            [center]="false">
          </job-actions-section>
        </div>

        <div class="sixteen wide column">
          <job-company-image-section
            [job]="job"
            style="padding: 0">
          </job-company-image-section>
        </div>

        <div class="sixteen wide mobile only column">
          <share-with-modal-section></share-with-modal-section>
        </div>

        <div class="sixteen wide mobile ten wide tablet ten wide computer column">
          <job-short-description-section [job]="job"></job-short-description-section>
          <job-company-short-description-section [job]="job"></job-company-short-description-section>
        </div>

        <div class="sixteen wide mobile six wide tablet six wide computer column">
          <job-important-information-section [job]="job"></job-important-information-section>
        </div>

        <div class="sixteen wide mobile ten wide tablet ten wide computer column">
          <job-description-section [job]="job"></job-description-section>
        </div>

        <div class="sixteen wide mobile six wide tablet six wide computer column">
          <job-tasks-section [job]="job"></job-tasks-section>
          <job-applicant-section [job]="job"></job-applicant-section>
          <job-requirements-section [job]="job"></job-requirements-section>
        </div>

        <div class="sixteen wide mobile only column">
          <job-recruiter-section [job]="job"></job-recruiter-section>
        </div>

        <div class="sixteen wide mobile ten wide tablet ten wide computer column">
          <job-actions-section
            [(application)]="application"
            [job]="job"
            [center]="true">
          </job-actions-section>
        </div>

        <div class="six wide tablet six wide computer only column">
          <job-recruiter-section [job]="job"></job-recruiter-section>
        </div>
      </div>
    </div>`
})
export class JobPageComponent extends PageComponent {
  public application: Application;
  public job: Job;
  public jobId: string;
  public jobPromise: Promise<Job>;

  private routeParamsSubscription: Subscription;

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    private jobProxy: JobProxy,
    private route: ActivatedRoute,
    protected meta: Meta,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected translateService: TranslateService,
    protected userResolver: UserResolver,
  ) {
    super(
      {
        title: {
          translate: true,
          content: 'meta.job.title'
        },
        description: {
          translate: true,
          content: 'meta.job.description'
        },
        image: {
          content: '/assets/images/job-banner-section-background.jpg'
        }
      },
      document,
      meta,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver
    );
  }


  public onInit(): void {
    this.initRouteParamsSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.jobId = params['id'];
      this.loadData();
    });
  }

  private loadData(): void {
    this.jobPromise = this.jobProxy.getJob(this.jobId, {
      'include': 'owner,company,hourly_pay,company.company_images,comments,responsible_recruiter,responsible_recruiter.user_images'
    })
    .then(job => {
      this.job = job;
      this.updatePageMeta({
        title: {
          translate: false,
          content: job.translatedText.name
        },
        description: {
          translate: false,
          content: job.translatedText.shortDescription
        }
      });
      return job;
    })
  }

  public systemLanguageChanged(systemLanguage: Language) {
    this.loadData();
  }

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }
}
