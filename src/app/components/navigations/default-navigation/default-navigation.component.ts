import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {LanguageMenuComponent} from '../../menus/language-menu/language-menu.component';
import {NavigationMenuComponent} from '../../menus/navigation-menu/navigation-menu.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'default-navigation',
  styleUrls: ['./default-navigation.component.scss'],
  template: `
    <div
      class="navigation-container">
      <app-navbar
        [isLanguageMenuVisible]="isLanguageMenuVisible"
        (onToggleLanguageMenu)="toggleLanguageMenu()"
        (onToggleNavigationMenu)="toggleNavigationMenu()">
      </app-navbar>
      <div class="menu-container" id="menu-container">
        <navigation-menu
          #navigationMenuComponent
          [options]="{context: '#menu-container', transition: 'overlay', mobileTransition: 'overlay'}"
          [(isNavigationMenuVisible)]=isNavigationMenuVisible>
        </navigation-menu>
        <language-menu
          #languageMenuComponent
          [options]="{context: '#menu-container', transition: 'overlay', mobileTransition: 'overlay'}"
          [(isLanguageMenuVisible)]=isLanguageMenuVisible>
        </language-menu>
        <div class="pusher">
        </div>
      </div>
    </div>`
})
export class DefaultNavigationComponent {
  @ViewChild('languageMenuComponent') public languageMenuComponent: LanguageMenuComponent;
  @ViewChild('navigationMenuComponent') public navigationMenuComponent: NavigationMenuComponent;

  public isLanguageMenuVisible: boolean = false;
  public isNavigationMenuVisible: boolean = false;

  public toggleLanguageMenu(): void {
    if (this.isLanguageMenuVisible) {
      this.languageMenuComponent.hide();
    } else {
      this.languageMenuComponent.show();
      this.navigationMenuComponent.hide();
    }
  }

  public toggleNavigationMenu(): void {
    if (this.isNavigationMenuVisible) {
      this.navigationMenuComponent.hide();
    } else {
      this.navigationMenuComponent.show();
      this.languageMenuComponent.hide();
    }
  }
}
