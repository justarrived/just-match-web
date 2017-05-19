import {Comment} from '../../../models/api-models/comment/comment';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

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
export class BasicCommentsComponent {
  @Input() public comments = null as Comment[];

}
