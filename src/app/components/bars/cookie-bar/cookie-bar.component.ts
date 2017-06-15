import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
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
        <base-button
          [routerLink]="JARoutes.aboutCookies.url()"
          [buttonText]="'cookies.read_more' | translate"
          style="margin-left: 10px; margin-right: 10px;"
          kind="secondary-light"
          size="small">
        </base-button>
        <base-button
          (click)="acceptCookiesConsent()"
          [buttonText]="'cookies.accept.button' | translate"
          style="margin-left: 10px; margin-right: 10px;"
          kind="secondary-light"
          size="small">
        </base-button>
      </div>
    </div>`
})
export class CookieBarComponent extends BaseComponent {
  private readonly cookiesConsentData: string = 'cookiesConsentData';

  public constructor(
    private dataStoreService: DataStoreService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public checkCookiesConsent(): boolean {
    return (this.dataStoreService.getCookie(this.cookiesConsentData) !== true);
  }

  public acceptCookiesConsent() {
    this.dataStoreService.setCookie(this.cookiesConsentData, true);
  }
}
