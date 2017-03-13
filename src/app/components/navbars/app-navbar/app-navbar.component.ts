import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Output} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {Language} from '../../../models/language/language';

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
          (click)="onLanguageMenuClick()"
          class="app-navbar-button-container">
          <div class="app-navbar-language-icon">
            {{selectedLanguage.languageCode}}
            <div
              [ngClass]="[isLanguageMenuVisible ? 'fa-caret-up' : 'fa-caret-down']"
              class="fa app-navbar-language-icon-arrow">
            </div>
          </div>
        </div>
        <div
          (click)="onNavigationMenuClick()"
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
  @Input() selectedLanguage: Language;
  @Output() onLanguageMenuButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() onNavigationMenuButtonClick: EventEmitter<any> = new EventEmitter();
  public JARoutes = JARoutes;

  public onLanguageMenuClick() {
    this.onLanguageMenuButtonClick.emit();
  }

  public onNavigationMenuClick() {
    this.onNavigationMenuButtonClick.emit();
  }
}
