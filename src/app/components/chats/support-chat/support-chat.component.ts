import {Component} from '@angular/core';
import {Chat} from '../../../models/api-models/chat/chat';
import {ChatProxy} from '../../../proxies/chat/chat.proxy';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'support-chat',
  template: `
    <sm-loader
      [complete]="chatPromise"
      class="inverted">
    </sm-loader>
    <basic-chat
      [chatId]="chat.id"
      [infoMessageDescription]="'support.chat.info.message.description' | translate"
      [infoMessageHeader]="'support.chat.info.message.header' | translate"
      *ngIf="chat">
    </basic-chat>`
})
export class SupportChatComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  public chat: Chat;
  public chatPromise: Promise<Chat>;
  public user: User;

  private userSubscription: Subscription;

  public constructor(
    private chatProxy: ChatProxy,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.initUser();
    this.loadData();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
      if (user) {
        this.loadData();
      }
    });
  }

  protected loadData() {
    this.chatPromise = this.chatProxy.getUserSupportChat(this.user.id)
    .then(chat =>  {
      return this.chat = chat;
    })
  }


  public ngOnDestroy(): void {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
  }
}
