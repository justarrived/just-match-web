import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'default-navigation',
  styleUrls: ['./default-navigation.component.scss'],
  template: `
    <div
      [ngStyle]="(isNavigationMenuVisible || isLanguageMenuVisible) && {'height': '100%'}"
      class="navigation-container">
      <app-navbar
        [(isLanguageMenuVisible)]="isLanguageMenuVisible"
        [(isNavigationMenuVisible)]="isNavigationMenuVisible">
      </app-navbar>
      <div
        (click)="isNavigationMenuVisible = false; isLanguageMenuVisible = false;"
        *ngIf="isSideMenuVisible"
        class="menu-overlay-container">
        <div class="menu-container">
          <navigation-menu
            [(isNavigationMenuVisible)]=isNavigationMenuVisible>
          </navigation-menu>

          <language-menu
            [(isLanguageMenuVisible)]=isLanguageMenuVisible>
          </language-menu>
        </div>
      </div>
    </div>`
})
export class DefaultNavigationComponent {
  public isLanguageMenuVisible: boolean;
  public isNavigationMenuVisible: boolean;

  public get isSideMenuVisible(): boolean {
    return this.isNavigationMenuVisible || this.isLanguageMenuVisible;
  }
}
