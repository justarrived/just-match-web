import {Component} from '@angular/core';
import {DataStore} from '../../services/data-store.service';


@Component({
  selector: 'cookie-bar',
  templateUrl: './cookie-bar.component.html',
  styleUrls: ['./cookie-bar.component.scss']
})
export class CookieBarComponent {
  private cookiesConsentData: string = 'cookiesConsentData';

  constructor(private dataStore: DataStore) {
  }

  checkCookiesConsent(): boolean {
    return (this.dataStore.get(this.cookiesConsentData) !== true);
  }

  acceptCookiesConsent() {
    this.dataStore.set(this.cookiesConsentData, true);
  }
}
