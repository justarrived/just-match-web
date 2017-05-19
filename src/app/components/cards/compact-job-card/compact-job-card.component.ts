import {Component} from '@angular/core';
import {fadeInAnimation} from '../../../animations/fade-in/fade-in.animation';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Job} from '../../../models/api-models/job/job';
import {OnInit} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'compact-job-card',
  styleUrls: ['./compact-job-card.component.scss'],
  template: `
  <div
    class="ui raised card link job-card"
    routerLink="{{JARoutes.job.url([job.id])}}">
    <div class="content job-content-container">
      <img
        [src]="job?.company?.logoImage?.imageUrlSmall || '/assets/images/placeholder-logo.png'"
        [ngClass]="{'right': systemLanguage.direction === 'ltr', 'left': systemLanguage.direction === 'rtl'}"
        class="floated mini ui image">
      <div class="job-header-container">
        <basic-title-text
          [text]="job.translatedText.name"
          [maxiumLinesEllipsis]="3"
          color="black"
          fontSize="small"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
      </div>
      <basic-title-text
        [text]="job?.company?.name"
        [oneLineEllipsis]="true"
        fontWeight="light"
        color="pink"
        fontSize="tiny"
        marginTop="0"
        marginBottom="0">
      </basic-title-text>
      <basic-title-text
        [text]="job.city"
        [oneLineEllipsis]="true"
        [uppercase]="true"
        fontWeight="light"
        color="gray"
        fontSize="tiny"
        marginTop="0"
        marginBottom="0">
      </basic-title-text>
      <div class="job-description-container">
        <basic-text
          [text]="job.translatedText.shortDescription"
          [maxiumLinesEllipsis]="2"
          fontSize="small"
          color="black"
          marginTop="0"
          marginBottom="0">
        </basic-text>
      </div>
    </div>
    <div class="extra content">
      <div
        [style.flex-direction]="systemLanguage.direction === 'rtl' ? 'row-reverse' : 'row'"
        class="job-salary-container">
        <basic-title-text
          [text]="job.hourlyPay.grossSalary"
          [oneLineEllipsis]="true"
          fontWeight="light"
          color="pink"
          fontSize="huge"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
        <basic-title-text
          style="margin-left: 1em; margin-right: 1em;"
          [text]="'job.card.currency.per.hour' | translate: {currency: job.currency}"
          [oneLineEllipsis]="true"
          fontWeight="light"
          color="gray"
          fontSize="medium"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
      </div>

      <div
        [style.flex-direction]="systemLanguage.direction === 'rtl' ? 'row-reverse' : 'row'"
        class="job-salary-additional-info">
        <basic-title-text
          style="flex: 1;"
          [text]="'job.card.hours' | translate: {hours: job.hours} "
          [oneLineEllipsis]="true"
          [uppercase]="true"
          textAlignmentLtr="left"
          textAlignmentRtl="right"
          fontWeight="bold"
          color="gray"
          fontSize="tiny"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
        <basic-title-text
          style="flex: 1;"
          [text]="job.grossAmountWithCurrency"
          [oneLineEllipsis]="true"
          [uppercase]="true"
          textAlignmentLtr="right"
          textAlignmentRtl="left"
          fontWeight="bold"
          color="gray"
          fontSize="tiny"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
      </div>
    </div>
  </div>`

})
export class CompactJobCardComponent implements OnInit, OnDestroy  {
  @Input() public job = null as Job;

  public JARoutes = JARoutes;
  public animationState: string = 'hidden';

  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public constructor(
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public ngOnInit(): void {
    this.initSystemLanguage()
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }
}
