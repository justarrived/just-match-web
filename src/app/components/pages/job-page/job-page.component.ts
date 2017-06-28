import {ActivatedRoute} from '@angular/router';
import {Application} from '../../../models/api-models/application/application';
import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {Language} from '../../../models/api-models/language/language';
import {Meta} from '@angular/platform-browser';
import {PageOptionsService} from '../../../services/page-options.service';
import {PageComponent} from '../page.component';
import {REQUEST} from '../../../../express-engine';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  styleUrls: ['./job-page.component.scss'],
  template: `
    <basic-loader
      [promise]="jobPromise"
      class="inverted">
    </basic-loader>

    <div *ngIf="job">
      <job-banner-section></job-banner-section>

      <div
        class="ui grid job-page-grid"
        [style.direction]="systemLanguage.direction">

        <div
          class="nine wide computer eight wide tablet only column"
          style="padding-right: 5px; padding-bottom: 0; display: flex; flex-direction: column;">
          <div class="job-section">
            <job-title-section [job]="job"></job-title-section>
            <div style="display: flex; align-items: center; margin-top: 50px;">
              <job-actions-section
                [(application)]="application"
                [job]="job"
                [hideReadMore]="true"
                [center]="false">
              </job-actions-section>
              <share-with-modal-section style="margin-left: 30px; margin-right: 30px;"></share-with-modal-section>
            </div>
          </div>
          <div
            class="job-section"
            style="flex: 1">
            <job-company-description-section [job]="job"></job-company-description-section>
            <job-description-section [job]="job"></job-description-section>
            <div style="margin-top: 40px;">
              <job-recruiter-section [job]="job"></job-recruiter-section>
            </div>
          </div>
          <div class="job-section">
            <job-actions-section
              [(application)]="application"
              [job]="job"
              [center]="true">
            </job-actions-section>
          </div>
        </div>

        <div
          class="seven wide computer eight wide tablet only column"
          style="padding-left: 5px; padding-bottom: 0; display: flex; flex-direction: column;">
          <div
            class="job-section"
            style="flex: 1">
            <job-company-image-section
              [job]="job">
            </job-company-image-section>
            <div style="margin-top: 30px;">
              <job-important-information-section [job]="job"></job-important-information-section>
            </div>
          </div>
          <div
            *ngIf="job.translatedText.tasksDescriptionHtml"
            class="job-section">
            <job-tasks-section [job]="job"></job-tasks-section>
          </div>
          <div
            *ngIf="job.translatedText.applicantDescriptionHtml || job.translatedText.requirementsDescriptionHtml"
            class="job-section">
            <job-applicant-section [job]="job"></job-applicant-section>
            <job-requirements-section [job]="job"></job-requirements-section>
          </div>
        </div>

        <div
          class="sixteen wide mobile only column"
          style="padding-bottom: 0; display: flex; flex-direction: column;">
          <div class="job-section">
            <job-title-section [job]="job"></job-title-section>
            <div style="display: flex; align-items: center; margin-top: 50px;">
              <job-actions-section
                [(application)]="application"
                [job]="job"
                [hideReadMore]="true"
                [center]="false">
              </job-actions-section>
              <share-with-modal-section style="margin-left: 30px; margin-right: 30px;"></share-with-modal-section>
            </div>
          </div>
          <div class="job-section">
            <job-company-image-section
              [job]="job"
              style="padding: 0">
            </job-company-image-section>
            <div style="margin-top: 30px;">
              <job-important-information-section [job]="job"></job-important-information-section>
            </div>
          </div>
          <div class="job-section">
            <job-company-description-section [job]="job"></job-company-description-section>
            <job-description-section [job]="job"></job-description-section>
          </div>
          <div
            *ngIf="job.translatedText.tasksDescriptionHtml"
            class="job-section">
            <job-tasks-section [job]="job"></job-tasks-section>
          </div>
          <div
            *ngIf="job.translatedText.applicantDescriptionHtml || job.translatedText.requirementsDescriptionHtml || job.responsibleRecruiter"
            class="job-section">
            <job-applicant-section [job]="job"></job-applicant-section>
            <job-requirements-section [job]="job"></job-requirements-section>
            <div style="margin-top: 40px;">
              <job-recruiter-section [job]="job"></job-recruiter-section>
            </div>
          </div>
          <div class="job-section">
            <job-actions-section
              [(application)]="application"
              [job]="job"
              [center]="true">
            </job-actions-section>
          </div>
        </div>

        <div
          class="sixteen wide column"
          style="padding-top: 0;">
          <div class="job-section">
           <back-to-jobs-section></back-to-jobs-section>
          </div>
        </div>
      </div>
    </div>`
})
export class JobPageComponent extends PageComponent {
  public application: Application;
  public job: Job;
  public jobId: string;
  public jobPromise: Promise<Job>;
  public previewKey: string;

  private static readonly idParam: string = 'id';
  private static readonly includes: string = 'owner,company,hourly_pay,company.company_images,comments,responsible_recruiter,responsible_recruiter.user_images';
  private static readonly pageMetaImageUrl: string = '/assets/images/job-banner-section-background.jpg';
  private static readonly pageMetaTranslateKeyDescription: string = 'meta.job.description';
  private static readonly pageMetaTranslateKeyTitle: string = 'meta.job.title';
  private static readonly previewKeyParam: string = 'preview_key';
  private static readonly transparentNavbarWhenTopScrolled: boolean = true;

  private routeParamsSubscription: Subscription;
  private queryParamsSubscription: Subscription;

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    private jobProxy: JobProxy,
    private route: ActivatedRoute,
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
          content: JobPageComponent.pageMetaTranslateKeyTitle
        },
        description: {
          translate: true,
          content: JobPageComponent.pageMetaTranslateKeyDescription
        },
        image: {
          content: JobPageComponent.pageMetaImageUrl
        }
      },
      document,
      meta,
      pageOptionsService,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver,
      JobPageComponent.transparentNavbarWhenTopScrolled,
    );
  }


  public onInit(): void {
    this.initRouteParamsSubscription();
    this.initQueryParamsSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.jobId = params[JobPageComponent.idParam];
      this.loadData();
    });
  }

  private initQueryParamsSubscription(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.previewKey = params[JobPageComponent.previewKeyParam];
    });
  }

  public systemLanguageChanged(systemLanguage: Language) {
    this.loadData();
  }

  private loadData(): void {
    this.jobPromise = this.jobProxy.getJob(this.jobId, {
      'include': JobPageComponent.includes
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

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }
}
