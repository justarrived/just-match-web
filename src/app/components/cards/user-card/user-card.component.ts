import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {fadeInAnimation} from '../../../animations/fade-in/fade-in.animation';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';

@Component({
  animations: [fadeInAnimation('200ms')],
  selector: 'user-card',
  styleUrls: ['./user-card.component.scss'],
  template: `
    <div
      [@fadeInAnimation]="animationState"
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
        <basic-title-text
          [uppercase]="true"
          [text]="user.firstName + ' ' + user.lastName"
          [oneLineEllipsis]="true"
          fontWeight="bold"
          color="pink"
          fontSize="small"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
        <basic-text
          [text]="user.email"
          [oneLineEllipsis]="true"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="user.phone"
          [alwaysLtrText]="true"
          [text]="user.phone"
          [oneLineEllipsis]="true"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
      </div>
      <div
        class="extra content">
        <i
          *ngIf="systemLanguage.direction === 'ltr'"
          class="ui big icon marker">
        </i>
        <basic-text
          [text]="user.fullStreetAddress"
          [maxiumLinesEllipsis]="2"
          fontSize="small"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="!user.fullStreetAddress"
          [text]="'user.card.no.address' | translate"
          [maxiumLinesEllipsis]="2"
          fontSize="small"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
        <i
          *ngIf="systemLanguage.direction === 'rtl'"
          class="ui big icon marker">
        </i>
      </div>
    </div>`
})
export class UserCardComponent implements OnInit, OnDestroy {
  @Input() public centered: boolean;
  @Input() public user = null as User;
  @Input() public animationDelay: number = 1;

  public animationState: string = 'hidden';

  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public constructor(
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public ngOnInit(): void {
    this.initSystemLanguage()
    setTimeout(() => {
      this.animationState = 'visible';
    }, this.animationDelay);
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }
}
