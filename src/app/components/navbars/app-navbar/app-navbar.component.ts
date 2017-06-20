import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./app-navbar.component.scss'],
  template: `
  <nav class="app-navbar-container">
    <div class="app-navbar-inner-container">
      <div class="logo">
        <a routerLink="{{JARoutes.home.url()}}">
          <img
            alt="Just Arrived"
            class="logo-image"
            src="/assets/images/light-logo.png"/>
        </a>
      </div>
      <div class="menu-items-container">
        <div
          (click)="onLanguageMenuButtonClick()">
          <div class="language-menu-item">
            <div
              [ngClass]="[isLanguageMenuVisible ? 'fa-caret-up' : 'fa-caret-down']"
              class="fa arrow-icon">
            </div>
            <basic-text
              [text]="systemLanguage.languageCode"
              [alwaysLtrText]="true"
              marginTop="0"
              marginBottom="0"
              [uppercase]="true"
              color="white">
            </basic-text>
          </div>
        </div>

        <hr class="seperator">

        <div
          (click)="onNavigationMenuButtonClick()"
          class="navigation-menu-item">
        </div>
      </div>
    </div>
  </nav>
  `
})
export class AppNavbarComponent extends BaseComponent {
  @Input() isLanguageMenuVisible: boolean;
  @Output() onToggleLanguageMenu: EventEmitter<any> = new EventEmitter();
  @Output() onToggleNavigationMenu: EventEmitter<any> = new EventEmitter();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onNavigationMenuButtonClick() {
    this.onToggleNavigationMenu.emit();
  }

  public onLanguageMenuButtonClick() {
    this.onToggleLanguageMenu.emit();
  }
}
