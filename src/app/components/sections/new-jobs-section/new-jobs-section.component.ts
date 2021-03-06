import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {JobProxy} from '../../../proxies/job/job.proxy';
import {Language} from '../../../models/api-models/language/language';
import {nbrOfMonthsFromDate} from '../../../utils/date/date.util';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {yyyymmdd} from '../../../utils/date/date.util';

@Component({
  selector: 'new-jobs-section',
  template: `
    <div class="ui basic padded center aligned segment">
      <basic-loader
        [promise]="newJobs"
        class="inverted">
      </basic-loader>
      <basic-title-text
        [text]="'home.jobs.slider.new.jobs.title' | translate"
        [underlineBelow]="true"
        fontSize="huge"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <div
        class="ui centered grid"
        [style.flex-direction]="systemLanguage.direction === 'rtl' ? 'row-reverse': 'row'">
        <job-card
          [job]="job"
          *ngFor="let job of newJobs | async"
          class="ui basic left aligned segment"
          style="margin: 1rem 0">
        </job-card>
      </div>
      <base-navigation-button
        [buttonText]="'home.jobs.slider.show.all.link' | translate"
        [routerLink]="JARoutes.jobs.url(['1'])"
        kind="primary"
        size="medium">
      </base-navigation-button>
    </div>
    `
})
export class NewJobsSectionComponent extends BaseComponent {
  public newJobs: Promise<Job[]>;

  public constructor(
    private jobProxy: JobProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  protected loadData(): void {
    this.newJobs = this.jobProxy.getJobs({
      'filter[open_for_applications]': true,
      'filter[filled]': false,
      'include': 'company,company.company_images',
      'page[size]': 9,
      'sort': '-featured,-created_at',
    });
  }
}
