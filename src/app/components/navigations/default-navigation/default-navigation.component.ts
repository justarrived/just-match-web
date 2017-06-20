import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {LanguageMenuComponent} from '../../menus/language-menu/language-menu.component';
import {NavigationMenuComponent} from '../../menus/navigation-menu/navigation-menu.component';
import {slideInDownOutTopAnimation} from '../../../animations/slide-in-down-out-top/slide-in-down-out-top.animation';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';


const menuAnimationDuration = 400;

@Component({
  animations: [slideInDownOutTopAnimation(menuAnimationDuration + 'ms', '100%')],
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
    </div>
    <div class="navigation-container">
      <div
        class="menu-container"
        [class.visible]="isNavigationMenuVisible || isLanguageMenuVisible"
        (click)="hideMenus()">
        <div
          class="menu-inner-container"
          [@slideInDownOutTopAnimation]="animationState">
          <navigation-menu
            #navigationMenuComponent
            [(isNavigationMenuVisible)]=isNavigationMenuVisible>
          </navigation-menu>
          <language-menu
            #languageMenuComponent
            [(isLanguageMenuVisible)]=isLanguageMenuVisible>
          </language-menu>
        </div>
      </div>
    </div>`
})
export class DefaultNavigationComponent extends BaseComponent {
  @ViewChild('languageMenuComponent') public languageMenuComponent: LanguageMenuComponent;
  @ViewChild('navigationMenuComponent') public navigationMenuComponent: NavigationMenuComponent;

  public animationState: string = 'out';

  public isLanguageMenuVisible: boolean = false;
  public isNavigationMenuVisible: boolean = false;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public toggleLanguageMenu(): void {
    if (this.isLanguageMenuVisible) {
      setTimeout(() => {
        this.isLanguageMenuVisible = false;
      }, menuAnimationDuration);
      this.animationState = 'out';
    } else {
      this.isLanguageMenuVisible = true;
      this.isNavigationMenuVisible = false;
      this.animationState = 'in';
    }
  }

  public toggleNavigationMenu(): void {
    if (this.isNavigationMenuVisible) {
      setTimeout(() => {
        this.isNavigationMenuVisible = false;
      }, menuAnimationDuration);
      this.animationState = 'out';
    } else {
      this.isLanguageMenuVisible = false;
      this.isNavigationMenuVisible = true;
      this.animationState = 'in';
    }
  }

  public hideMenus(): void {
    if (this.isNavigationMenuVisible) {
      setTimeout(() => {
        this.isNavigationMenuVisible = false;
      }, menuAnimationDuration);
    }

    if (this.isLanguageMenuVisible) {
      setTimeout(() => {
        this.isLanguageMenuVisible = false;
      }, menuAnimationDuration);
    }

    this.animationState = 'out';
  }
}
