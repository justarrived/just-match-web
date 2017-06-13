import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

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
export class JobMapMarkerComponent extends BaseComponent {
  @Input() public job = null as Job;
  public infoVisible: boolean = false;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
