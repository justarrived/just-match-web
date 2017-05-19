import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'maximize-chances-section',
  styleUrls: ['./maximize-chances-section.component.scss'],
  template: `
    <div
      class="ui basic very padded segment maximize-chances-container">
      <basic-title-text
        [text]="'home.instructions.second.section.title' | translate"
        [underlineBelow]="true"
        color="white"
        fontSize="large"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="white"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center"
        marginTop="0"
        marginBottom="2rem">
      </basic-title-text>
      <basic-title-text
        [text]="'home.instructions.second.section.instruction1' | translate"
        iconLeft="check circle outline"
        color="white"
        fontSize="small"
        marginTop="0">
      </basic-title-text>
      <basic-title-text
        [text]="'home.instructions.second.section.instruction2' | translate"
        iconLeft="check circle outline"
        color="white"
        fontSize="small"
        marginTop="0">
      </basic-title-text>
      <basic-title-text
        [text]="'home.instructions.second.section.instruction3' | translate"
        iconLeft="check circle outline"
        color="white"
        fontSize="small"
        marginTop="0">
      </basic-title-text>
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
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
  }
}
