import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JobDigest} from '../../../models/api-models/job-digest/job-digest';
import {JobDigestProxy} from '../../../proxies/job-digest/job-digest.proxy';
import {Language} from '../../../models/api-models/language/language';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-digests-pager-section',
  template: `
    <div style="display: flex; flex-direction: column;">
      <div style="margin-top: 30px; background: white; padding: 20px; border-radius: 20px;">
        <basic-title-text
          [text]="'subscribe.new.title' | translate"
          color="black"
          fontSize="large"
          marginBottom="20px"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center"
          underlineBelow="true"
          underlineBelowLtrAlignment="center"
          underlineBelowRtlAlignment="center">
        </basic-title-text>
        <subscribe-form
          (digestCreated)="digestCreated($event)">
        </subscribe-form>
      </div>

      <basic-title-text
        [text]="'job.digests.pager.section.title' | translate"
        color="black"
        fontSize="large"
        marginBottom="0"
        marginTop="30px"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelow="true"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>

      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalJobDigests"
        [pageSize]="pageSize"
        type="light">
      </numbered-pager>

      <div
        class="ui basic center aligned segment"
        style="flex: 1; margin: 0; padding: 0;">
        <basic-loader
          [promise]="jobDigestsMetaPromise"
          class="inverted">
        </basic-loader>
        <basic-text
          [text]="'job.digests.pager.section.empty' | translate"
          *ngIf="totalJobDigests === 0"
          color="black"
          fontSize="large"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
        <div
          *ngFor="let jobDigest of (jobDigestsMetaPromise | async)?.jobDigests; let i = index;"
          style="margin-bottom: 30px; background: white; padding: 20px; border-radius: 20px;">
          <basic-title-text
            [text]="'job.digests.pager.section.subscription.title' | translate: {subscriptionNumber: totalJobDigests - ((i + 1) + (page - 1) * pageSize) + 1}"
            color="black"
            fontSize="large"
            marginBottom="20px"
            marginTop="0"
            textAlignmentLtr="center"
            textAlignmentRtl="center"
            underlineBelow="true"
            underlineBelowLtrAlignment="center"
            underlineBelowRtlAlignment="center">
          </basic-title-text>
          <subscribe-form
            [jobDigest]="jobDigest"
            (digestDeleted)="loadData()">
          </subscribe-form>
        </div>
      </div>

      <numbered-pager
        (pageChange)="onPageChange($event)"
        [currentPage]="page"
        [maxResults]="totalJobDigests"
        [pageSize]="pageSize"
        type="light">
      </numbered-pager>
    </div>`
})
export class JobDigestsPagerSectionComponent extends BaseComponent {

  public digestSubscriberUuid: string;
  public jobDigestsMetaPromise: Promise<{jobDigests: JobDigest[], meta: any}>;
  public page: number = 1;
  public readonly pageSize: number = 12;
  public totalJobDigests: number = 0;

  private readonly subscriberParam: string = 'subscriberUuid';
  private routeParamsSubscription: Subscription;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private jobDigestProxy: JobDigestProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.initRouteParamsSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      this.digestSubscriberUuid = params[this.subscriberParam];
      this.loadData();
    });
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData(): void {
    let searchParameters = {
      'sort': '-created_at',
      'include': 'address,subscriber,occupations',
      'page[number]': this.page,
      'page[size]': this.pageSize
    };
    if (!(this.user || this.digestSubscriberUuid)) {
      this.jobDigestsMetaPromise = null;
    } else {
      this.jobDigestsMetaPromise = this.jobDigestProxy.getJobDigestsWithMeta((this.user && this.user.id) || this.digestSubscriberUuid, searchParameters)
      .then(result => {
        this.totalJobDigests = result.meta.total;
        return result;
      });
    }
  }

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }

  public digestCreated(jobDigest: JobDigest): void {
    this.digestSubscriberUuid = jobDigest.subscriber.uuid;
    this.loadData();
  }

  public onPageChange(page: number): void {
    this.page = page;
    this.loadData();
  }
}
