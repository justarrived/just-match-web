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
      <p
        *ngIf="comments?.length === 0"
        style="text-align: center">
        {{'basic.comments.empty' | translate}}
      </p>
    </div>
    `
})
export class BasicCommentsComponent {
  @Input() public comments = null as Comment[];

}
