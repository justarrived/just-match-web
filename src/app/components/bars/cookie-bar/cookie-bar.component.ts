import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {JARoutes} from '../../../routes/ja-routes';

@Component({
  selector: 'cookie-bar',
  styleUrls: ['./cookie-bar.component.scss'],
  template: `
    <div
      *ngIf="checkCookiesConsent()"
      class="cookie-message">
      <div class="cookie-message-inner">
        <p
          class="fs-m0">
          {{'cookies.description' | translate}}
          <a
            [routerLink]="JARoutes.aboutCookies.url()"
            class="read-more fs-m0">
            {{'cookies.read_more' | translate}}
          </a>
        </p>
        <div class="cookies-button">
          <base-button
            (click)="acceptCookiesConsent()"
            [buttonText]="'cookies.accept.button' | translate"
            kind="secondary-light"
            size="small">
          </base-button>
        </div>
      </div>
    </div>`
})
export class CookieBarComponent {
  private readonly cookiesConsentData: string = 'cookiesConsentData';
  public JARoutes = JARoutes;

  public constructor(
    private dataStoreService: DataStoreService
  ) {
  }

  public checkCookiesConsent(): boolean {
    return (this.dataStoreService.get(this.cookiesConsentData) !== true);
  }

  public acceptCookiesConsent() {
    this.dataStoreService.set(this.cookiesConsentData, true);
  }
}
