import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'back-to-jobs-section',
  styleUrls: ['./back-to-jobs-section.component.scss'],
  template: `
    <div
      class="back-to-jobs-container"
      style="display: flex; flex-direction: column; align-items: center; cursor: pointer;"
      [routerLink]="JARoutes.jobs.url([lastJobsPage])">
      <div class="icon"></div>
      <basic-title-text
        [text]="'back.to.jobs.section.link' | translate"
        [oneLineEllipsis]="true"
        fontSize="small"
        color="pink"
        marginTop="1rem"
        marginBottom="0"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-title-text>
    </div>`
})
export class BackToJobsSectionComponent extends BaseComponent {

  public lastJobsPage: number;
  private readonly jobsPageKey: string = 'jobsPageKey';

  public constructor (
    private dataStoreService: DataStoreService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.lastJobsPage = this.dataStoreService.getFromMemory(this.jobsPageKey) || 1;
  }
}
