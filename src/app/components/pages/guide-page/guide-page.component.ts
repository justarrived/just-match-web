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
  template: `
    <div class="ui padded basic segment">
      <div class="ui grid">
        <guide-card
          fadedTitle="hej hej"
          title="hahhashahjaj ashhas"
          [clickable]="true"
          cornerIcon="heart"
          cornerIconBackgroundColor="blue">
          <basic-text
            text="bla asjasjl  asskajk askjnsa  askjnj asjka  as askjbsa as askja ns asjasna sa,sjsa as, ajksbsaas,  akhsba msakhbs ">
          </basic-text>
          <basic-text
            text="bla asjasjl  asskajk askjnsa  askjnj asjka  as askjbsa as askja ns asjasna sa,sjsa as, ajksbsaas,  akhsba msakhbs ">
          </basic-text>
          <basic-text
            text="bla asjasjl  asskajk askjnsa  askjnj asjka  as askjbsa as askja ns asjasna sa,sjsa as, ajksbsaas,  akhsba msakhbs ">
          </basic-text>
          <basic-text
            text="bla asjasjl  asskajk askjnsa  askjnj asjka  as askjbsa as askja ns asjasna sa,sjsa as, ajksbsaas,  akhsba msakhbs ">
          </basic-text>
          <div style="display: flex; justify-content: center;">
            <base-action-button
              buttonText="Click me"
              size="small">
            </base-action-button>
          </div>
        </guide-card>
      </div>
    </div>
  `
})
export class GuidePageComponent extends PageComponent {

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
          content: 'meta.guide.title'
        },
        description: {
          translate: true,
          content: 'meta.guide.description'
        }
      },
      document,
      meta,
      pageOptionsService,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver,
      false,
    );
  }
}
