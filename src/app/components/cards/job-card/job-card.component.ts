import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Job} from '../../../models/api-models/job/job';

@Component({
  selector: 'job-card',
  styleUrls: ['./job-card.component.scss'],
  template: `
  <div
    class="ui raised card link job-card"
    routerLink="{{JARoutes.job.url([job.id])}}">
    <div class="content job-content-container">
      <img
        [src]="job?.company?.logoImage?.imageUrlSmall || '/assets/images/placeholder-logo.png'"
        class="right floated mini ui image">
      <div class="job-header-container">
        <div class="header job-header">
          {{job.translatedText.name}}
        </div>
      </div>
      <div class="meta job-company">
        {{job.company.name}}
      </div>
      <div class="meta job-city">
        {{job.city}}
      </div>
      <div class="job-description-container">
        <div class="description job-description">
          {{job.translatedText.shortDescription}}
        </div>
      </div>
    </div>
    <div class="extra content job-salary-container">
      <span class="job-salary">
        {{job.hourlyPay.grossSalary}}
      </span>
      <span class="job-salary-currency">
        {{'job.card.currency.per.hour' | translate: {currency: job.currency} }}
      </span>
      <div class="job-salary-additional-info">
        <span class="job-hours">
          {{'job.card.hours' | translate: {hours: job.hours} }}
        </span>
        <span class="right floated job-total-salary">
          {{job.grossAmountWithCurrency}}
        </span>
      </div>
    </div>
  </div>
  `
})
export class JobCardComponent {
  @Input() public job = null as Job;
  public JARoutes = JARoutes;
}
