import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {fadeInAnimation} from '../../../animations/fade-in/fade-in.animation';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  animations: [fadeInAnimation('200ms')],
  selector: 'user-card',
  styleUrls: ['./user-card.component.scss'],
  template: `
    <div
      [@fadeInAnimation]="animationState"
      class="ui card link"
      [ngClass]="{'centered': centered}">
      <div class="image">
        <img
          [src]="shownUser.profileImage.imageUrlMedium"
          *ngIf="shownUser.profileImage">
        <img
          *ngIf="!shownUser.profileImage"
          src="/assets/images/placeholder-profile-image.png">
      </div>
      <div class="base content">
        <basic-title-text
          [uppercase]="true"
          [text]="shownUser.firstName + ' ' + shownUser.lastName"
          [oneLineEllipsis]="true"
          fontWeight="bold"
          color="pink"
          fontSize="small"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
        <basic-text
          [alwaysLtrText]="true"
          [text]="shownUser.email"
          [oneLineEllipsis]="true"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="shownUser.phone"
          [alwaysLtrText]="true"
          [text]="shownUser.phone"
          [oneLineEllipsis]="true"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
      </div>
      <div
        class="extra content"
        [style.direction]="systemLanguage.direction">
        <i
          class="ui big icon marker">
        </i>
        <basic-text
          [text]="shownUser.fullStreetAddress"
          [maxiumLinesEllipsis]="2"
          fontSize="small"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="!shownUser.fullStreetAddress"
          [text]="'shownUser.card.no.address' | translate"
          [maxiumLinesEllipsis]="2"
          fontSize="small"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
      </div>
    </div>`
})
export class UserCardComponent extends BaseComponent {
  @Input() public centered: boolean;
  @Input() public shownUser = null as User;
  @Input() public animationDelay: number = 1;

  public animationState: string = 'hidden';

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    setTimeout(() => {
      this.animationState = 'visible';
    }, this.animationDelay);
  }
}
