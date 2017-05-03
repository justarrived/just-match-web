import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {GodModeUsersSectionComponent} from '../../sections/god-mode-users-section/god-mode-users-section.component';
import {ViewChild} from '@angular/core';

@Component({
  template: `
    <basic-border-header
      [header]="'god.mode.title' | translate: {numberOfUsers: godModeUsersSectionComponent.total}"
      icon="search">
    </basic-border-header>

    <god-mode-users-section
      [currentRoute]="JARoutes.godMode"
      #godModeUsersSectionComponent>
    </god-mode-users-section>`
})
export class GodModePageComponent {
  @ViewChild('godModeUsersSectionComponent') public godModeUsersSectionComponent : GodModeUsersSectionComponent;

  public JARoutes = JARoutes;
}
