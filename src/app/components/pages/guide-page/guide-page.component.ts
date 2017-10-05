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
          fadedTitle="Innan du söker jobb"
          title="Vad är LMA-kort och vad är AT-UND?"
          [clickable]="false">
          <basic-text
            text="
              LMA-kort är ett plastkort med ditt namn och ett foto av dig. LMA
              är en förkortning för lagen om mottagande av asylsökande. LMA-kortet
              är inte en identitetshandling, utan ett bevis på att du är asylsökande,
              det är därför också tidsbegränsat. LMA-kort utfärdas av Migrationsverket.
            ">
          </basic-text>
          <basic-text
            text="
              AT-UND är ett undantag från lagen som säger att du behöver ett
              arbetstillstånd för att arbeta i Sverige. Alla som ansöker om asyl
              i Sverige, och har identifierat sig själva hos Migrationsverket har
              AT-UND. Om du är osäker, titta på ditt LMA-kort. AT-UND står under
              punkt 7.
            ">
          </basic-text>
          <basic-text
            text="Vill du läsa mer?"
            fontWeight="bold">
          </basic-text>
          <basic-link
            text="LMA-kortet på Migrationsverket"
            href="https://www.migrationsverket.se/Privatpersoner/Skydd-och-asyl-i-Sverige/Medan-du-vantar/LMA-kort.html"
            color="pink"
            marginTop="0">
          </basic-link>
          <basic-link
            text="AT-UND på Migrationsverket"
            href="https://www.migrationsverket.se/Privatpersoner/Skydd-och-asyl-i-Sverige/Medan-du-vantar/Arbeta.html"
            color="pink"
            marginTop="0">
          </basic-link>
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
