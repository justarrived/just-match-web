import {Component, Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {NavigationService} from '../../../services/navigation.service';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';

@Component({
  selector: 'job-map-marker',
  template: `
    <agm-marker
      (markerClick)="infoVisible = true"
      [iconUrl]="'assets/images/map_job_icon.png'"
      [latitude]="job.zipLatitude"
      [longitude]="job.zipLongitude"
      class="job-map-marker">
      <agm-info-window
        (infoWindowClose)="infoVisible = false"
        [disableAutoPan]="true"
        [isOpen]="infoVisible">
        <compact-job-card [job]="job"></compact-job-card>
      </agm-info-window>
    </agm-marker>`
})
export class JobMapMarkerComponent {
  @Input() public job = null as Job;
  public infoVisible: boolean = false;

  constructor(
    private navigationService: NavigationService
  ) {
  }
}
