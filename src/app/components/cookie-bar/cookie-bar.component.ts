import {Component} from '@angular/core';
import {DataStore} from '../../services/data-store.service';
import {JARoutes} from '../../routes/ja-routes';


@Component({
  selector: 'cookie-bar',
  templateUrl: './cookie-bar.component.html',
  styleUrls: ['./cookie-bar.component.scss']
})
export class CookieBarComponent {
  private cookiesConsentData: string = 'cookiesConsentData';
  private JARoutes = JARoutes;

  constructor(
    private dataStore: DataStore
  ) {
  }

  private checkCookiesConsent(): boolean {
    return (this.dataStore.get(this.cookiesConsentData) !== true);
  }

  private acceptCookiesConsent() {
    this.dataStore.set(this.cookiesConsentData, true);
  }
}
