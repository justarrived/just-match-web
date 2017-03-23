import {Comment} from '../../models/api-models/comment/comment';
import {CommentsProxy} from '../../services/proxy/comments-proxy.service';
import {Component} from '@angular/core';
import {ElementRef} from '@angular/core';
import {HostListener} from '@angular/core';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {orderBy} from 'lodash';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../resolvers/user/user.resolver';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends SystemLanguageListener implements OnInit {
  @Input() public resourceId: number;
  @Input() public resourceName: string;
  public newCommentContainer: any;
  public comments: Comment[];
  public userId: string;
  public newCommentBody: string;
  public isFooterVisible: boolean;

  @HostListener('window:scroll', ['$event']) onDocumentScroll(event: any) {
    this.calculateFooterVisibility();
  }

  public constructor(
    private commentsProxy: CommentsProxy,
    private elementRef: ElementRef,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
    const user = this.userResolver.getUser();
    this.userId = user && user.id;
  }

  public ngOnInit() {
    this.loadData();
    this.calculateFooterVisibility();
  }

  public sendComment() {
    this.commentsProxy.sendComment(
      this.resourceName,
      this.resourceId,
      {
        commentable_id: this.resourceId,
        commentable_type: this.resourceName,
        language_id: this.systemLanguagesResolver.getSelectedSystemLanguage().id,
        body: this.newCommentBody
      })
      .then(result => {
        this.newCommentContainer.textContent = '';
        this.newCommentBody = null;
        this.loadData();
    });
  }

  public onNewCommentInput(event) {
    if (!this.newCommentContainer) {
      this.newCommentContainer = event.target;
    }
    this.newCommentBody = event.target.textContent;
  }

  protected loadData() {
    this.commentsProxy.getComments(this.resourceName, this.resourceId, {
      include: 'owner,owner.user_images,owner.company,owner.company.company_images',
      sort: '-created_at'
    }).then(result => {
      this.comments = result.data.reverse();
      this.calculateFooterVisibility();
    });
  }

  private getDocumentHeight() {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  }

  private calculateFooterVisibility() {
    let scrollHeight = document.body.scrollTop;
    let windowHeight = window.innerHeight;
    let footerHeight = document.getElementsByTagName('default-footer')[0]['offsetHeight'];
    let documentHeight = this.getDocumentHeight();
    let isFooterVisibleActual = windowHeight + scrollHeight >= documentHeight - footerHeight;
    if (isFooterVisibleActual !== this.isFooterVisible) {
      this.isFooterVisible = isFooterVisibleActual;
    }
  }
}
