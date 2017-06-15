import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job'
import {BaseComponent} from '../../base.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-company-image-section',
  template: `
    <img
      *ngIf="job?.company?.logoImage"
      [src]="job.company.logoImage.imageUrlMedium"
      class="ui image"
      style="max-height: 100px; max-width: 50%;">
    <basic-title-text
      *ngIf="!job?.company?.logoImage"
      [alwaysLtrText]="true"
      [text]="job?.company?.name"
      [oneLineEllipsis]="true"
      fontSize="huge"
      fontWeight="light"
      color="black"
      marginTop="0"
      marginBottom="0"
      textAlignmentLtr="left"
      textAlignmentRtl="right">
    </basic-title-text>`
})
export class JobCompanyImageSectionComponent extends BaseComponent {
  @Input() job = null as Job;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
