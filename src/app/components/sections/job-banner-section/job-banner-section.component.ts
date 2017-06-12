import {Application} from '../../../models/api-models/application/application';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'job-banner-section',
  styleUrls: ['./job-banner-section.component.scss'],
  template: `
    <div class="banner-container">
      <div
        class="ui grid grid-container"
        [style.direction]="systemLanguage.direction">
        <div class="sixteen wide mobile ten wide tablet ten wide computer column">
          <job-title-section [job]="job"></job-title-section>
        </div>
        <div class="three wide tablet only three wide computer only column">
          <job-actions-section
            (applicationChange)="applicationChange.emit($event)"
            [hideReadMore]="true"
            [job]="job"
            [center]="false">
          </job-actions-section>
        </div>
        <div
          class="three wide tablet only three wide computer only column"
          style="display: flex; justify-content: flex-end;">
          <share-with-modal-section></share-with-modal-section>
        </div>
      </div>
    </div>`
})
export class JobBannerSectionComponent extends BaseComponent {
  @Input() job = null as Job;
  @Input() application = null as Application;
  @Output() public applicationChange: EventEmitter<Application> = new EventEmitter<Application>();

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
