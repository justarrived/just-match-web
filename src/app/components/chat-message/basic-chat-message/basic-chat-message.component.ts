import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {isThisWeek} from '../../../utils/date/date.util';
import {isToday} from '../../../utils/date/date.util';
import {Message} from '../../../models/api-models/message/message';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'basic-chat-message',
  styleUrls: ['./basic-chat-message.component.scss'],
  template: `
    <div
      [id]="'message' + message.id"
      [class.right-aligned]="rightAligned"
      class="ui comment"
      style="min-height: 3em; margin-top: 1em; margin-bottom: 1em;">
      <div class="avatar">
        <img
          [src]="message?.author?.company?.logoImage?.imageUrlSmall || '/assets/images/placeholder-logo.png'"
          *ngIf="message?.author?.company">
        <img
          [src]="message?.author?.profileImage?.imageUrlSmall || '/assets/images/placeholder-profile-image.png'"
          *ngIf="!message?.author?.company">
      </div>
      <div class="content">
        <div
          *ngIf="message?.author?.company"
          class="author">
          <basic-text
            [text]="message.author.company.name"
            [oneLineEllipsis]="true"
            fontWeight="bold"
            color="black"
            fontSize="medium"
            marginTop="0"
            marginBottom="0"
            [textAlignmentLtr]="rightAligned ? 'right' : ' left'"
            [textAlignmentRtl]="rightAligned ? 'right' : ' left'">
          </basic-text>
        </div>
        <div
          *ngIf="!message?.author?.company"
          class="author">
          <basic-text
            [text]="message.author.firstName"
            [oneLineEllipsis]="true"
            fontWeight="bold"
            color="black"
            fontSize="medium"
            marginTop="0"
            marginBottom="0"
            [textAlignmentLtr]="rightAligned ? 'right' : ' left'"
            [textAlignmentRtl]="rightAligned ? 'right' : ' left'">
          </basic-text>
        </div>
        <basic-text
          [alwaysLtrText]="true"
          [text]="(isToday(message.createdAt) && (message.createdAt | date:'HH:mm')) || (isThisWeek(message.createdAt) && (message.createdAt | date:'EEEE HH:mm')) || (message.createdAt | date:'dd LLLL HH:mm')"
          [oneLineEllipsis]="true"
          color="gray"
          fontSize="small"
          marginTop="0"
          marginBottom="0"
          [textAlignmentLtr]="rightAligned ? 'right' : ' left'"
          [textAlignmentRtl]="rightAligned ? 'right' : ' left'">
        </basic-text>
        <div
          class="text">
          <basic-text
            [alwaysLtrText]="message?.language?.direction === 'ltr'"
            [alwaysRtlText]="message?.language?.direction === 'rtl'"
            [unsafeHtml]="message.bodyHtml"
            fontWeight="bold"
            class="message"
            color="white"
            fontSize="medium"
            marginTop="0"
            marginBottom="0"
            [textAlignmentLtr]="message?.language?.direction === 'rtl' ? 'right' : ' left'"
            [textAlignmentRtl]="message?.language?.direction === 'rtl' ? 'right' : ' left'">
          </basic-text>
        </div>
      </div>
    </div>`
})
export class BasicChatMessageComponent extends BaseComponent {
  @Input() public message = null as Message;
  @Input() public rightAligned: boolean = false;

  public isThisWeek = isThisWeek;
  public isToday = isToday;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
