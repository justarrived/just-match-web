import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {fadeInAnimation} from '../../../animations/fade-in/fade-in.animation';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {User} from '../../../models/api-models/user/user';

@Component({
  animations: [fadeInAnimation('200ms')],
  selector: 'user-card',
  styleUrls: ['./user-card.component.scss'],
  template: `
    <div
      class="ui raised card link"
      [ngClass]="{'centered': centered}">
      <div class="image">
        <img
          [src]="user.profileImage.imageUrlMedium"
          *ngIf="user.profileImage">
        <img
          *ngIf="!user.profileImage"
          src="/assets/images/placeholder-profile-image.png">
      </div>
      <div class="base content">
        <div
          class="ui pink header"
          [style.margin-bottom]="0">
          {{user.firstName + ' ' + user.lastName | uppercase}}
        </div>
        <div class="description">
          {{user.email}}
        </div>
        <div
          *ngIf="user.phone"
          class="description">
          {{user.phone}}
        </div>
      </div>
      <div
        class="extra content">
        <i class="ui big icon marker"></i>
        <div
          *ngIf="user.fullStreetAddress"
          class="address fs-s">
          {{user.fullStreetAddress}}
        </div>
        <div
          *ngIf="!user.fullStreetAddress"
          class="address fs-s no-address">
          {{'user.card.no.address' | translate}}
        </div>
      </div>
    </div>`
})
export class UserCardComponent implements OnInit {
  @Input() public centered: boolean;
  @Input() public user = null as User;
  @Input() public animationDelay: number = 1;

  public animationState: string = 'hidden';

  public ngOnInit() {
    setTimeout(() => {
      this.animationState = 'visible';
    }, this.animationDelay);
  }
}
