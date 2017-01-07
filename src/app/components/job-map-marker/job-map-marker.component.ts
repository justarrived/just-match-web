import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Job} from '../../models/job/job';

@Component({
  selector: 'job-map-marker',
  templateUrl: './job-map-marker.component.html',
  styleUrls: ['./job-map-marker.component.scss']
})
export class JobMapMarkerComponent {
  @Input() job: Job;

  constructor(private router: Router) { }

  goToJob(job) {
    this.router.navigate(['/job', job.id]);
  }
}
