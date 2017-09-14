import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {PageOptionsService} from '../../../services/page-options.service';
import {PageComponent} from '../page.component';
import {REQUEST} from '../../../../express-engine';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  styleUrls: ['./subscriptions-page.component.scss'],
  template: `
  <div class="ui centered grid subscriptions-page-grid">
    <div class="sixteen wide mobile twelve wide tablet ten wide computer column login-form-container">
      <basic-title-text
        [text]="'subscribe.title' | translate"
        [underlineBelow]="true"
        color="black"
        fontSize="huge"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center"
        marginTop="30px"
        marginBottom="30px">
      </basic-title-text>

      <info-message
        [closeable]="true"
        [description]="'job.digest.form.info' | translate"
        icon="warning">
      </info-message>

      <job-digests-pager-section>
      </job-digests-pager-section>
    </div>
  </div>`
})
export class SubscriptionsPageComponent extends PageComponent {

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    protected meta: Meta,
    protected pageOptionsService: PageOptionsService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected translateService: TranslateService,
    protected userResolver: UserResolver,
  ) {
    super(
      {
        title: {
          translate: true,
          content: 'meta.subscribe.title'
        },
        description: {
          translate: true,
          content: 'meta.subscribe.description'
        }
      },
      document,
      meta,
      pageOptionsService,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver
    );
  }
}
