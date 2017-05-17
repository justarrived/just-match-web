import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {nbrOfMonthsFromDate} from '../../../utils/date/date.util';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {yyyymmdd} from '../../../utils/date/date.util';

@Component({
  selector: 'new-jobs-section',
  template: `
    <div class="ui basic padded center aligned segment">
      <sm-loader
        [promise]="newJobs"
        class="inverted">
      </sm-loader>
      <basic-title-text
        [text]="'home.jobs.slider.new.jobs.title' | translate"
        [underlineBelow]="true"
        fontSize="large"
        ltrTextAlignment="center"
        rtlTextAlignment="center"
        underlineBelowColor="pink">
      </basic-title-text>
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
