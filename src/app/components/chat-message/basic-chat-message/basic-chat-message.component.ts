import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {isThisWeek} from '../../../utils/date/date.util';
import {isToday} from '../../../utils/date/date.util';
import {Message} from '../../../models/api-models/message/message';

@Component({
  selector: 'basic-chat-message',
  styleUrls: ['./basic-chat-message.component.scss'],
  template: `
    <div
      [class.right-aligned]="rightAligned"
      class="ui comment"
      style="min-height: 3em;">
      <a class="avatar">
        <img
          [src]="message?.author?.company?.logoImage?.imageUrlSmall || '/assets/images/placeholder-logo.png'"
          *ngIf="message?.author?.company">
        <img
          [src]="message?.author?.profileImage?.imageUrlSmall || '/assets/images/placeholder-profile-image.png'"
          *ngIf="!message?.author?.company">
      </a>
      <div class="content">
        <a
          *ngIf="message?.author?.company"
          class="author">
          {{message.author.company.name}}
        </a>
        <a
          *ngIf="!message?.author?.company"
          class="author">
          {{message.author.firstName}}
        </a>
        <div class="metadata">
          <span class="date">
            {{
              (isToday(message.createdAt) && (message.createdAt | date:'HH:mm')) ||
              (isThisWeek(message.createdAt) && (message.createdAt | date:'EEEE HH:mm')) ||
              (message.createdAt | date:'dd LLLL HH:mm')
            }}
          </span>
        </div>
        <div
          [innerHTML]="message.bodyHtml"
          class="text">
        </div>
      </div>
    </div>`
})
export class BasicChatMessageComponent {
  @Input() public message = null as Message;
  @Input() public rightAligned: boolean = false;

  public isThisWeek = isThisWeek;
  public isToday = isToday;
}
