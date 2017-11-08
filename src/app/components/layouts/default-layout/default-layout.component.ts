import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {CookieBarComponent} from '../../../components/bars/cookie-bar/cookie-bar.component';
import {DataStoreService} from '../../../services/data-store.service';
import {PageOptionsService} from '../../../services/page-options.service';
import {RendererFactory2} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'default-layout',
  styleUrls: ['./default-layout.component.scss'],
  template: `
    <div class=layout-wrapper>
      <default-navigation></default-navigation>
      <div class="layout-inner-wrapper">
        <div
          *ngIf="useNavbarPadder()"
          class="layout-navbar-padder">
        </div>
        <cookie-bar></cookie-bar>
        <god-mode-bar></god-mode-bar>
        <section class="layout-content">
          <div
            class="ui form"
            style="height: 100%">
            <basic-loader
              [complete]="!user || !user.isBeingReloaded"
              class="inverted">
            </basic-loader>
            <router-outlet></router-outlet>
          </div>
        </section>
        <default-footer class="layout-footer"></default-footer>
      </div>
    </div>`
})
export class DefaultLayoutComponent extends BaseComponent {

  public constructor(
    private dataStoreService: DataStoreService,
    private pageOptionsService: PageOptionsService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public useNavbarPadder(): boolean {
    return !this.dataStoreService.getCookie(CookieBarComponent.cookiesConsentDataKey)
      || this.userResolver.godModeActive()
      || !this.pageOptionsService.transparentNavbarWhenTopScrolled();
  }
}
