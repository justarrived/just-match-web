import {BaseComponent} from '../../base.component';
import {Chat} from '../../../models/api-models/chat/chat';
import {ChatProxy} from '../../../proxies/chat/chat.proxy';
import {Component} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'support-chat',
  template: `
    <basic-loader
      [promise]="chatPromise"
      class="inverted">
    </basic-loader>
    <basic-chat
      [chatId]="chat.id"
      [infoMessageDescription]="'support.chat.info.message.description' | translate"
      [infoMessageHeader]="'support.chat.info.message.header' | translate"
      *ngIf="chat">
    </basic-chat>`
})
export class SupportChatComponent extends BaseComponent {
  public chat: Chat;
  public chatPromise: Promise<Chat>;

  public constructor(
    private chatProxy: ChatProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  public userChanged(user: User): void {
    this.loadData();
  }

  private loadData() {
    if (this.user) {
      this.chatPromise = this.chatProxy.getUserSupportChat(this.user.id)
      .then(chat =>  {
        return this.chat = chat;
      });
    }
  }
}
