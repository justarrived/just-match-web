import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'default-layout',
  styleUrls: ['./default-layout.component.scss'],
  template: `
    <div class=layout-wrapper>
      <default-navigation></default-navigation>
      <div class="layout-inner-wrapper">
        <div class="layout-header-padder"></div>
        <cookie-bar></cookie-bar>
        <god-mode-bar></god-mode-bar>
        <section class="layout-content">
          <div
            class="ui form"
            style="height: 100%">
            <sm-loader
              [complete]="!user || !user.isBeingReloaded"
              class="inverted">
            </sm-loader>
            <router-outlet></router-outlet>
          </div>
        </section>
        <default-footer class="layout-footer"></default-footer>
      </div>
    </div>`
})
export class DefaultLayoutComponent extends BaseComponent {

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
