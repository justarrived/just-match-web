import {Component} from '@angular/core';
import {DataStoreService} from '../../../services/data-store.service';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

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
export class CookieBarComponent implements OnInit, OnDestroy {
  private readonly cookiesConsentData: string = 'cookiesConsentData';
  public JARoutes = JARoutes;

  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public constructor(
    private dataStoreService: DataStoreService,
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public ngOnInit(): void {
    this.initSystemLanguage()
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }

  public checkCookiesConsent(): boolean {
    return (this.dataStoreService.getCookie(this.cookiesConsentData) !== true);
  }

  public acceptCookiesConsent() {
    this.dataStoreService.setCookie(this.cookiesConsentData, true);
  }
}
