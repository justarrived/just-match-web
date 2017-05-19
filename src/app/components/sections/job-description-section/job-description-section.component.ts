import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'

@Component({
  selector: 'job-description-section',
  template: `
    <div class="ui basic center aligned segment">
      <basic-title-text
        [text]="'job.description.section.header' | translate"
        [underlineBelow]="true"
        fontSize="medium"
        textAlignmentLtr="center"
        marginTop="0"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <basic-text [text]="job.translatedText.descriptionHtml"></basic-text>
    </div>`
})
export class JobDescriptionSectionComponent {
  @Input() job = null as Job;
}
