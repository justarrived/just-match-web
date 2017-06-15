import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Message} from '../../../models/api-models/message/message';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
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
      <basic-text
        [text]="'basic.chat.messages.empty' | translate"
        *ngIf="messages?.length === 0"
        color="black"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-text>
    </div>
    `
})
export class BasicChatMessagesComponent extends BaseComponent {
  @Input() public messages = null as Message[];

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
