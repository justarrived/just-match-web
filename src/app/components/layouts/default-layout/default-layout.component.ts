import {Component} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'default-layout',
  styleUrls: ['./default-layout.component.scss'],
  template: `
    <div class=layout-wrapper>
      <default-navigation></default-navigation>
      <div class="layout-inner-wrapper">
        <div class="layout-header-padder"></div>
        <section class="layout-content">
          <div class="ui form">
            <sm-loader
              [complete]="!user || !user.isBeingReloaded"
              class="inverted"
              text="{{'component.loading' | translate}}">
            </sm-loader>
            <cookie-bar></cookie-bar>
            <router-outlet></router-outlet>
          </div>
        </section>
        <default-footer class="layout-footer"></default-footer>
      </div>
    </div>`
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public user: User;

  private userSubscription: Subscription;

  public constructor(
    private userResolver: UserResolver
  ) {
  }

  public ngOnInit(): void {
    this.initUser();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
