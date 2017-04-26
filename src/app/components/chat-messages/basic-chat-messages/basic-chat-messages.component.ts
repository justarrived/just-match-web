import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Message} from '../../../models/api-models/message/message';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'basic-chat-messages',
  template: `
    <div class="ui comments">
      <basic-chat-message
        [message]="message"
        [rightAligned]="user?.id === message?.author?.id"
        *ngFor="let message of messages">
      </basic-chat-message>
      <p
        *ngIf="messages?.length === 0"
        style="text-align: center">
        {{'basic.chat.messages.empty' | translate}}
      </p>
    </div>
    `
})
export class BasicChatMessagesComponent implements OnInit, OnDestroy {
  @Input() public messages = null as Message[];

  public user: User;

  private userSubscription: Subscription;

  public constructor(
    private userResolver: UserResolver,
  ) {
  }

  public ngOnInit() {
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
