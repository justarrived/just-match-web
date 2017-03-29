import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Output} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./app-navbar.component.scss'],
  template: `
  <nav class="app-navbar-container">
    <div class="app-navbar-inner-container">
      <div class="app-navbar-home">
        <a routerLink="{{JARoutes.home.url()}}">
          <img
            alt="Just Arrived"
            class="app-navbar-logo-image"
            src="/assets/images/logo.png"/>
        </a>
      </div>
      <div class="app-navbar-menus">
        <div
          (click)="onLanguageMenuButtonClick()"
          class="app-navbar-button-container">
          <div class="app-navbar-language-icon">
            {{getSelectedSystemLanguageCode()}}
            <div
              [ngClass]="[isLanguageMenuVisible ? 'fa-caret-up' : 'fa-caret-down']"
              class="fa app-navbar-language-icon-arrow">
            </div>
          </div>
        </div>
        <div
          (click)="onNavigationMenuButtonClick()"
          class="app-navbar-button-container">
          <span class="fa fa-bars fa-2x app-navbar-menu-icon"></span>
        </div>
      </div>
    </div>
  </nav>
  `
})
export class AppNavbarComponent {
  @Input() isLanguageMenuVisible: boolean;
  @Input() isNavigationMenuVisible: boolean;
  @Output() isLanguageMenuVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() isNavigationMenuVisibleChange: EventEmitter<boolean> = new EventEmitter();
  public JARoutes = JARoutes;

  constructor (
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public getSelectedSystemLanguageCode() {
    return this.systemLanguagesResolver.getSelectedSystemLanguage().languageCode;
  }

  public onNavigationMenuButtonClick() {
    this.isLanguageMenuVisible = false;
    this.isNavigationMenuVisible = !this.isNavigationMenuVisible;
    this.isLanguageMenuVisibleChange.emit(this.isLanguageMenuVisible);
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }

  public onLanguageMenuButtonClick() {
    this.isNavigationMenuVisible = false;
    this.isLanguageMenuVisible = !this.isLanguageMenuVisible;
    this.isLanguageMenuVisibleChange.emit(this.isLanguageMenuVisible);
    this.isNavigationMenuVisibleChange.emit(this.isNavigationMenuVisible);
  }
}
