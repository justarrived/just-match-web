import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'maximize-chances-section',
  styleUrls: ['./maximize-chances-section.component.scss'],
  template: `
    <div
      class="ui basic very padded segment maximize-chances-container">
      <div class="ui basic center aligned segment">
        <h3>{{'home.instructions.second.section.title' | translate}}</h3>
        <p>{{'home.instructions.second.section.description' | translate}}</p>
      </div>
      <div class="instruction">
        <i class="fa fa-check-circle-o fa-2x"></i>
        <div class="instruction-text">
          {{'home.instructions.second.section.instruction1' | translate}}
        </div>
      </div>
      <div class="instruction">
        <i class="fa fa-check-circle-o fa-2x"></i>
        <div class="instruction-text">
          {{'home.instructions.second.section.instruction2' | translate}}
        </div>
      </div>
      <div class="instruction">
        <i class="fa fa-check-circle-o fa-2x"></i>
        <div class="instruction-text">
          {{'home.instructions.second.section.instruction3' | translate}}
        </div>
      </div>
      <div class="maximize-chances-button">
        <base-button
          [buttonText]="'common.start_here' | translate"
          [fluid]="true"
          [routerLink]="JARoutes.registerUser.url()"
          *ngIf="!user"
          kind="secondary-light"
          size="medium">
        </base-button>
        <base-button
          [buttonText]="'home.header.logged.in.profile.button' | translate"
          [fluid]="true"
          [routerLink]="JARoutes.user.url()"
          *ngIf="user"
          kind="secondary-light"
          size="medium">
        </base-button>
      </div>
    </div>`
})
export class MaximizeChancessSectionComponent implements OnInit, OnDestroy {
  public JARoutes = JARoutes;
  public user: User;

  private userSubscription: Subscription;

  public constructor(
    private userResolver: UserResolver
  ) {
  }

  public ngOnInit() {
    this.initUser();
  }

  private initUser() {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
