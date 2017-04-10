import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {JobsPagerSectionComponent} from '../../sections/jobs-pager-section/jobs-pager-section.component';
import {ViewChild} from '@angular/core';

@Component({
  template: `
    <basic-border-header
      [header]="'jobs.title' | translate: {nbrOfJobs: jobsPagerSectionComponent.totalJobs}"
      icon="search">
    </basic-border-header>

    <jobs-map></jobs-map>

    <jobs-pager-section
      [currentRoute]="JARoutes.jobs"
      #jobsPagerSectionComponent>
    </jobs-pager-section>`
})
export class JobsPageComponent {
  @ViewChild('jobsPagerSectionComponent') public jobsPagerSectionComponent : JobsPagerSectionComponent;

  public JARoutes = JARoutes;
}
