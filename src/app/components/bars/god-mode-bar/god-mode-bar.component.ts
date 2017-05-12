import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
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
        <div>
          <h3 class="god-mode-bar-title">
            {{'god.mode.bar.title'| translate: {firstName: user.firstName, lastName: user.lastName, id: user.id} }}
          </h3>
          <p class="god-mode-bar-description">
            {{'god.mode.bar.description' | translate}}
          </p>
        </div>
        <div class="god-mode-bar-button-container">
          <base-button
            (click)="deactivateGodMode()"
            [buttonText]="'god.mode.deactivate.button' | translate"
            [fluid]="true"
            kind="secondary-light"
            size="small">
          </base-button>
          <base-button
            (click)="changeUser()"
            [buttonText]="'god.mode.change.user.button' | translate"
            [fluid]="true"
            kind="secondary-light"
            size="small">
          </base-button>
        </div>
      </div>
    </div>`
})
export class GodModeBarComponent implements OnInit, OnDestroy {
  public user: User;
  public godModeActive: boolean;

  private userSubscription: Subscription;

  public constructor(
    private navigationService: NavigationService,
    private userResolver: UserResolver
  ) {
  }

  public ngOnInit() {
    this.initUser();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.godModeActive = this.userResolver.godModeActive();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
      this.godModeActive = this.userResolver.godModeActive();
    });
  }

  public ngOnDestroy(): void {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
  }

  public deactivateGodMode(): void {
    this.userResolver.deactivateGodMode();
  }

  public changeUser(): void {
    this.navigationService.navigate(JARoutes.godMode);
  }

  public goToUserProfile(): void {
    this.navigationService.navigate(JARoutes.user);
  }
}
