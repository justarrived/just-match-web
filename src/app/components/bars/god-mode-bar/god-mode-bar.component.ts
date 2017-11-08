import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {NavigationService} from '../../../services/navigation.service';
import {PageOptionsService} from '../../../services/page-options.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'god-mode-bar',
  styleUrls: ['./god-mode-bar.component.scss'],
  template: `
    <div
      *ngIf="godModeActive"
      class="god-mode-bar-container">
      <div class="god-mode-bar-inner-container">
        <basic-title-text
          [text]="'god.mode.bar.title'| translate: {firstName: user.firstName, lastName: user.lastName, id: user.id}"
          color="white"
          fontSize="medium"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
        <basic-text
          [text]="'god.mode.bar.description' | translate"
          color="white"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-text>
        <div class="god-mode-bar-button-container">
          <base-action-button
            (click)="deactivateGodMode()"
            [buttonText]="'god.mode.deactivate.button' | translate"
            [fluid]="true"
            kind="secondary-light"
            size="small">
          </base-action-button>
          <base-navigation-button
            [routerLink]="JARoutes.godMode.url()"
            [buttonText]="'god.mode.change.user.button' | translate"
            [fluid]="true"
            kind="secondary-light"
            size="small">
          </base-navigation-button>
        </div>
      </div>
    </div>`
})
export class GodModeBarComponent extends BaseComponent {
  public godModeActive: boolean;

  public constructor(
    private navigationService: NavigationService,
    private pageOptionsService: PageOptionsService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.godModeActive = this.userResolver.godModeActive();
  }

  public userChanged(user: User): void {
    this.godModeActive = this.userResolver.godModeActive();
  }

  public deactivateGodMode(): void {
    this.userResolver.deactivateGodMode();
    // Trigger change event
    this.pageOptionsService.setTransparentNavbarWhenTopScrolled(this.pageOptionsService.transparentNavbarWhenTopScrolled());
  }

  public changeUser(): void {
    this.navigationService.navigate(this.JARoutes.godMode);
  }
}
