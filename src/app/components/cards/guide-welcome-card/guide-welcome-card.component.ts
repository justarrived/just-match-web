import {Application} from '../../../models/api-models/application/application';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {fadeInAnimation} from '../../../animations/fade-in/fade-in.animation';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'guide-welcome-card',
  template: `
    <guide-card
      [fadedTitle]="'guide.card.welcome.faded.title' | translate"
      [title]="'guide.card.welcome.title' | translate"
      [width]="width">
      <basic-text [text]="'guide.card.welcome.paragraph.1' | translate"></basic-text>
      <basic-text [text]="'guide.card.welcome.paragraph.2' | translate"></basic-text>
      <base-navigation-button
        [buttonText]="'guide.card.welcome.button' | translate"
        [routerLink]="JARoutes.guideSection.url([1])"
        size="small"
        style="margin: 0 auto">
      </base-navigation-button>
    </guide-card>
    `

})
export class GuideWelcomeCardComponent extends BaseComponent {
  @Input() public width: string = '100%';

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
