import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-profile-header',
  styleUrls: ['./user-profile-header.component.scss'],
  template: `
  <div class="ui centered grid user-profile-header-container">
    <div class="fourteen wide mobile ten wide tablet eight wide computer column">
      <div class="ui basic segment">
        <profile-image-input
          [centered]="true"
          size="small">
        </profile-image-input>
      </div>
      <basic-title-text
        [text]="user.name"
        [underlineBelow]="true"
        color="white"
        fontSize="large"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="white"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <basic-text
        [text]="'user.profile.header.information' | translate"
        color="white"
        fontSize="large"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-text>
    </div>
  </div>`
})
export class UserProfileHeaderComponent implements OnInit, OnDestroy {
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
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
  }
}
