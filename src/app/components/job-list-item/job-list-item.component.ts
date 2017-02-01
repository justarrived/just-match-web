import {Component, Input} from '@angular/core';
import {Job} from '../../models/job/job';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';

@Component({
  selector: 'job-list-item',
  templateUrl: './job-list-item.component.html',
  styleUrls: ['./job-list-item.component.scss']
})
export class JobListItemComponent {
  @Input() job: Job;

  constructor(
    private navigationService: NavigationService
  ) {
  }

  private onListItemClick(): void {
    this.navigationService.navigate(JARoutes.job, this.job.id);
  }
}
