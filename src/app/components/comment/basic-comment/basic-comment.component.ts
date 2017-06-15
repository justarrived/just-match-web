import {BaseComponent} from '../../base.component';
import {Comment} from '../../../models/api-models/comment/comment';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {isThisWeek} from '../../../utils/date/date.util';
import {isToday} from '../../../utils/date/date.util';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'basic-comment',
  styleUrls: ['./basic-comment.component.scss'],
  template: `
    <div
      [class.right-aligned]="rightAligned"
      class="ui comment">
      <a class="avatar">
        <img
          [src]="comment?.owner?.company?.logoImage?.imageUrlSmall || '/assets/images/placeholder-logo.png'"
          *ngIf="comment?.owner?.company">
        <img
          [src]="comment?.owner?.profileImage?.imageUrlSmall || '/assets/images/placeholder-profile-image.png'"
          *ngIf="!comment?.owner?.company">
      </a>
      <div class="content">
        <a
          *ngIf="comment?.owner?.company"
          class="author">
          {{comment.owner.company.name}}
        </a>
        <a
          *ngIf="!comment?.owner?.company"
          class="author">
          {{comment.owner.firstName}}
        </a>
        <div class="metadata">
          <span class="date">
            {{
              (isToday(comment.createdAt) && (comment.createdAt | date:'HH:mm')) ||
              (isThisWeek(comment.createdAt) && (comment.createdAt | date:'EEEE HH:mm')) ||
              (comment.createdAt | date:'dd LLLL HH:mm')
            }}
          </span>
        </div>
        <div class="text">
          {{comment.body}}
        </div>
      </div>
    </div>`
})
export class BasicCommentComponent extends BaseComponent {
  @Input() public comment = null as Comment;
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
