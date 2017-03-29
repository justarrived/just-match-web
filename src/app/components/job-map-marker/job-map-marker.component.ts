import {Component, Input} from '@angular/core';
import {Job} from '../../models/api-models/job/job';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes/ja-routes';

@Component({
  selector: 'job-map-marker',
  templateUrl: './job-map-marker.component.html',
  styleUrls: ['./job-map-marker.component.scss']
})
export class JobMapMarkerComponent {
  @Input() job = null as Job;

  constructor(
    private navigationService: NavigationService
  ) {
  }

  private goToJob(): void {
    this.navigationService.navigate(JARoutes.job, this.job.id);
  }
}
