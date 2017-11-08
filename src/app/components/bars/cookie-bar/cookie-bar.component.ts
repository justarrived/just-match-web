import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {PageOptionsService} from '../../../services/page-options.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'cookie-bar',
  styleUrls: ['./cookie-bar.component.scss'],
  template: `
    <div
      *ngIf="checkCookiesConsent()"
      [style.direction]="systemLanguage.direction"
      class="cookie-message">
      <div class="cookie-message-inner">
        <basic-text
          [text]="'cookies.description' | translate"
          color="white"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
        <base-navigation-button
          [routerLink]="JARoutes.aboutCookies.url()"
          [buttonText]="'cookies.read_more' | translate"
          style="margin-left: 10px; margin-right: 10px;"
          kind="secondary-light"
          size="small">
        </base-navigation-button>
        <base-action-button
          (click)="acceptCookiesConsent()"
          [buttonText]="'cookies.accept.button' | translate"
          style="margin-left: 10px; margin-right: 10px;"
          kind="secondary-light"
          size="small">
        </base-action-button>
      </div>
    </div>`
})
export class CookieBarComponent extends BaseComponent {
  public static readonly cookiesConsentDataKey: string = 'cookiesConsentData';

  public constructor(
    private dataStoreService: DataStoreService,
    private pageOptionsService: PageOptionsService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public checkCookiesConsent(): boolean {
    return (this.dataStoreService.getCookie(CookieBarComponent.cookiesConsentDataKey) !== true);
  }

  public acceptCookiesConsent() {
    this.dataStoreService.setCookie(CookieBarComponent.cookiesConsentDataKey, true);
    // Trigger change event
    this.pageOptionsService.setTransparentNavbarWhenTopScrolled(this.pageOptionsService.transparentNavbarWhenTopScrolled());
  }
}
