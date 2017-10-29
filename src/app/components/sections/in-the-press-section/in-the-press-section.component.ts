import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'in-the-press-section',
  styleUrls: ['./in-the-press-section.component.scss'],
  template: `
  <div class="ui grid section-container">
    <div class="sixteen wide column">
      <basic-title-text fontSize="huge" color="white" text="Press"></basic-title-text>
    </div>

    <div class="equal width stackable row tablet only computer only">
      <div class="column">
        <a href="http://digital.di.se/artikel/har-ska-klarna-miljardarens-samhallsforbattrare-sitta">
          <img class="ui fluid image" src="/assets/images/logos/di.svg">
        </a>
      </div>
      <div class="column">
        <a href="http://www.metro.se/artikel/l%C3%A5t-ny-teknik-hantera-utanf%C3%B6rskapet-xr">
          <img class="ui fluid image" src="/assets/images/logos/metro.png">
        </a>
      </div>
      <div class="column">
        <a href="http://www.huffingtonpost.com/entry/58c0210fe4b070e55af9e9ef">
          <img class="ui fluid image" src="/assets/images/logos/huffington-post.png">
        </a>
      </div>
      <div class="column">
        <a href="https://www.dn.se/nyheter/sverige/elisabeth-svantesson-jag-ser-valdigt-annorlunda-pa-varlden-i-dag/">
          <img class="ui fluid image" src="/assets/images/logos/dn.png">
        </a>
      </div>
      <div class="column">
        <a href="https://www.va.se/nyheter/2016/08/26/just-arrived/">
          <img class="ui fluid image" src="assets/images/logos/veckans-affarer-white.png">
        </a>
      </div>
    </div>
  </div>
  `
})
export class InThePressSectionComponent extends BaseComponent {

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
