import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../services/proxy/job-proxy.service';
import {nbrOfMonthsFromDate} from '../../../utils/date-util';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {yyyymmdd} from '../../../utils/date-util';

@Component({
  selector: 'new-jobs-section',
  template: `
    <div class="ui basic padded center aligned segment">
      <sm-loader
        [promise]="newJobs"
        class="inverted"
        text="{{'component.loading' | translate}}">
      </sm-loader>
      <h2>{{'home.jobs.slider.new.jobs.title' | translate}}</h2>
      <div class="ui centered grid">
        <job-card
          [job]="job"
          *ngFor="let job of newJobs | async"
          class="ui basic left aligned segment"
          style="margin: 1rem 0">
        </job-card>
      </div>
      <base-button
        [buttonText]="'home.jobs.slider.show.all.link' | translate"
        [routerLink]="JARoutes.jobs.url(['1'])"
        kind="primary"
        size="medium">
      </base-button>
    </div>
    `
})
export class NewJobsSectionComponent extends SystemLanguageListener implements OnInit {
  public JARoutes = JARoutes;
  public newJobs: Promise<Job[]>;

  public constructor(
    private jobProxy: JobProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.loadData();
  }

  protected loadData(): void {
    this.newJobs = this.jobProxy.getJobs({
      'filter[filled]': false,
      'filter[job_date]': yyyymmdd(new Date()) + '..' + yyyymmdd(nbrOfMonthsFromDate(new Date(), 12)),
      'include': 'company,hourly_pay,company.company_images',
      'page[size]': 4,
      'sort': '-created_at',
    });
  }
}
