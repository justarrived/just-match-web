import {BaseComponent} from '../../base.component';
import {Comment} from '../../../models/api-models/comment/comment';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'basic-comments',
  template: `
    <div
      class="ui comments">
      <basic-comment
        [comment]="comment"
        *ngFor="let comment of comments">
      </basic-comment>
      <basic-text
        [text]="'basic.comments.empty' | translate"
        *ngIf="comments?.length === 0"
        color="black"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-text>
    </div>
    `
})
export class BasicCommentsComponent extends BaseComponent  {
  @Input() public comments = null as Comment[];

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
