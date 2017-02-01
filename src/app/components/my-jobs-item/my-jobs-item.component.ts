import {Component, Input} from '@angular/core';
import {Job} from '../../models/job/job';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';


@Component({
  selector: 'my-jobs-item',
  templateUrl: './my-jobs-item.component.html',
  styleUrls: ['./my-jobs-item.component.scss']
})
export class MyJobsItemComponent {
  @Input() private job: Job;
  @Input() private section: string;

  constructor(
    private navigationService: NavigationService
  ) {
  }

  private onListItemClick() {
    this.navigationService.navigate(JARoutes.job, this.job.id);
  }
}
