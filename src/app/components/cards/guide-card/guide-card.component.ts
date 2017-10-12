import {Application} from '../../../models/api-models/application/application';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {fadeInAnimation} from '../../../animations/fade-in/fade-in.animation';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  animations: [fadeInAnimation('200ms')],
  selector: 'guide-card',
  styleUrls: ['./guide-card.component.scss'],
  template: `
    <div
      [@fadeInAnimation]="animationState"
      class="ui raised card guide-card"
      [style.width]="width"
      [class.link]="clickable">
      <a
        *ngIf="cornerIcon"
        class="ui {{cornerIconBackgroundColor}} right corner label">
        <i class="{{cornerIcon}} icon"></i>
      </a>
      <basic-text
        [text]="fadedTitle"
        [uppercase]="true"
        color="gray"
        fontSize="small"
        fontWeight="bold"
        marginTop="0"
        marginBottom="0">
      </basic-text>
      <basic-title-text
        [text]="title"
        color="black"
        fontSize="huge"
        [underlineBelow]="true"
        underlineBelowColor="pink"
        marginTop="1rem">
      </basic-title-text>

      <img *ngIf="true" src="http://lorempixel.com/400/200/business/" alt="" />

      <p>
        Flera myndigheter samverkar om frågor som handlar om asyl, arbete, försäkringar
        och skatt i Sverige. Du behöver vända dig till rätt myndighet för att få hjälp
        med ditt ärende. De erbjuder service på många olika språk. Här kan du läsa mer
        om några viktiga myndigheter och vad de ansvarar för:
      </p>

      <h2>Migrationsverket</h2>
      <p>
        Ansvarar för frågor om asyl, besök och bosättning i Sverige, samt svenskt
        medborgarskap. De utfärdar de dokument som är nödvändiga för dig som är i
        Sverige utan att ha medborgarskap, t ex. <strong>LMA-kort</strong>,
        <strong>AT-UND</strong>. De är också
        <a href="https://www.migrationsverket.se/" rel="noopener" target="_blank">
        Migrationsverket</a> som fattar beslut om uppehållstillstånd.
      </p>

      <h3>Underrubrik</h3>
      <p>
        Ansvarar för frågor om <em>asyl</em>, <em>besök</em> och <em>bosättning</em>
        i Sverige, samt svenskt medborgarskap. De utfärdar de dokument som är
        nödvändiga för dig som är i Sverige utan att ha medborgarskap t ex.
        LMA-kort, AT-UND. De är också Migrationsverket som fattar beslut om
        uppehållstillstånd.
      </p>

      <!-- Länk i eget block wrappas i p-tagg -->
      <p>
        <a href="https://www.migrationsverket.se/" rel="noopener" target="_blank">
          Läs mer på migrationsverket.se
        </a>
      </p>

      <h2>Arbetsförmedlingen</h2>
      <p>
        Hjälper arbetssökande att hitta jobb, och arbetsgivare att tillsätta nya
        tjänster. De har också hand om etableringsplanen för de som har fått
        uppehållstillstånd i Sverige. De har en hemsida som heter Platsbanken,
        där många jobb i Sverige läggs upp.
      </p>
      <p>
        <a href="https://www.arbetsformedlingen.se/" rel="noopener" target="_blank">
          Läs mer på arbetsformedlingen.se
        </a>
      </p>
    </div>`

})
export class GuideCardComponent extends BaseComponent {
  @Input() public animationDelay: number = 1;
  @Input() public clickable: boolean;
  @Input() public cornerIcon: string;
  @Input() public cornerIconBackgroundColor: string;
  @Input() public fadedTitle: string;
  @Input() public imgAlt: string;
  @Input() public imgSrc: string;
  @Input() public title: string;
  @Input() public width: string = '100%';

  public animationState: string = 'hidden';

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    setTimeout(() => {
      this.animationState = 'visible';
    }, this.animationDelay);
  }
}
