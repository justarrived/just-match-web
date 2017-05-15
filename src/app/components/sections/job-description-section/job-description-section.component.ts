import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-description-section',
  template: `
    <div class="ui basic center aligned segment">
      <h3 class="underline-border-below underline-border-below-centered underline-border-below-pink">
        {{'job.description.section.header' | translate}}
      </h3>
      <basic-title [text]="'job.description.section.header' | translate"></basic-title>
      <basic-text [text]="job.translatedText.descriptionHtml"></basic-text>
    </div>`
})
export class JobDescriptionSectionComponent {
  @Input() job = null as Job;
}
