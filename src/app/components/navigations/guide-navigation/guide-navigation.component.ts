import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'guide-navigation',
  styleUrls: ['./guide-navigation.component.scss'],
  template: `
    <div class="ui link list guide-navigation">
      <div class="guide-nav-section-title">
        <a class="item"><h3>Innan du söker jobb</h3></a>
      </div>
      <a class="active item guide-nav-section-item">Det här behöver du för att börja jobba i Sverige</a>
      <a class="item guide-nav-section-item">Vad är LMA-kort och vad är AT-UND?</a>
      <a class="item guide-nav-section-item">Personnummer och samordningsnummer</a>
      <a class="item guide-nav-section-item">Därför behöver du ha ett bankkonto</a>
      <a class="item guide-nav-section-item">Vad ska jag prata för språk för att kunna jobba i Sverige?</a>
      <a class="item guide-nav-section-item">Myndigheter bra att ha koll på</a>

      <div class="guide-nav-section-title">
        <a class="item"><h3>Att söka jobb</h3></a>
      </div>
      <a class="active item guide-nav-section-item">Det här behöver du för att börja jobba i Sverige</a>
      <a class="item guide-nav-section-item">Vad är LMA-kort och vad är AT-UND?</a>
      <a class="item guide-nav-section-item">Personnummer och samordningsnummer</a>
      <a class="item guide-nav-section-item">Därför behöver du ha ett bankkonto</a>
      <a class="item guide-nav-section-item">Vad ska jag prata för språk för att kunna jobba i Sverige?</a>
      <a class="item guide-nav-section-item">Myndigheter bra att ha koll på</a>

      <div class="guide-nav-section-title">
        <a class="item"><h3>På jobbet</h3></a>
      </div>
      <a class="active item guide-nav-section-item">Det här behöver du för att börja jobba i Sverige</a>
      <a class="item guide-nav-section-item">Vad är LMA-kort och vad är AT-UND?</a>
      <a class="item guide-nav-section-item">Personnummer och samordningsnummer</a>
      <a class="item guide-nav-section-item">Därför behöver du ha ett bankkonto</a>
      <a class="item guide-nav-section-item">Vad ska jag prata för språk för att kunna jobba i Sverige?</a>
      <a class="item guide-nav-section-item">Myndigheter bra att ha koll på</a>
    </div>`
})
export class GuideNavigationComponent extends BaseComponent {

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
