import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {User} from '../../../models/api-models/user/user';

@Component({
  selector: 'user-card',
  styleUrls: ['./user-card.component.scss'],
  template: `
    <div
      class="ui raised card"
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
export class UserCardComponent {
  @Input() public centered: boolean;
  @Input() public user = null as User;
}
