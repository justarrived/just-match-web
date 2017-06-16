import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {JobsPagerSectionComponent} from '../../sections/jobs-pager-section/jobs-pager-section.component';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {REQUEST} from '../../../../express-engine';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  template: `
    <basic-border-section
      [header]="'jobs.title' | translate: {nbrOfJobs: jobsPagerSectionComponent.totalJobs}"
      icon="search">
    </basic-border-section>

    <jobs-map></jobs-map>

    <jobs-pager-section
      [currentRoute]="JARoutes.jobs"
      #jobsPagerSectionComponent>
    </jobs-pager-section>`
})
export class JobsPageComponent extends PageComponent {

  @ViewChild('jobsPagerSectionComponent') public jobsPagerSectionComponent : JobsPagerSectionComponent;

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    protected meta: Meta,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected translateService: TranslateService,
    protected userResolver: UserResolver,
  ) {
    super(
      {
        title: {
          translate: true,
          content: 'meta.jobs.title'
        },
        description: {
          translate: true,
          content: 'meta.jobs.description'
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
}
