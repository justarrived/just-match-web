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
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

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
export class JobPageComponent extends PageComponent {
  public application: Application;
  public job: Job;
  public jobId: string;
  public jobPromise: Promise<Job>;

  private routeParamsSubscription: Subscription;

  public constructor (
    @Inject(DOCUMENT) protected document: any,
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
          content: '/assets/images/job-header-background.jpg'
        }
      },
      document,
      meta,
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
      'include': 'owner,company,hourly_pay,company.company_images,comments'
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
