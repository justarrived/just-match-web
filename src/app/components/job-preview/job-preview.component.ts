import {Component, Input} from '@angular/core';
import {Job} from '../../models/job/job';

@Component({
  selector: 'job-preview',
  templateUrl: './job-preview.component.html',
  styleUrls: ['./job-preview.component.scss']
})
export class JobPreviewComponent {
  @Input() private job: Job;
  @Input() private isPreview: boolean = false;

  constructor(
  ) {
  }

}
