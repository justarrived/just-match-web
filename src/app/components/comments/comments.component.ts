import {Comment} from '../../models/api-models/comment/comment';
import {CommentProxy} from '../../proxies/comment/comment.proxy';
import {Component} from '@angular/core';
import {ElementRef} from '@angular/core';
import {HostListener} from '@angular/core';
import {Input} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {orderBy} from 'lodash';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../models/api-models/user/user';
import {UserResolver} from '../../resolvers/user/user.resolver';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  @Input() public resourceId: string;
  @Input() public resourceName: string;

  public comments: Comment[];
  public isFooterVisible: boolean;
  public newCommentBody: string;
  public newCommentContainer: any;
  public user: User;

  private userSubscription: Subscription;

  @HostListener('window:scroll', ['$event']) onDocumentScroll(event: any) {
    this.calculateFooterVisibility();
  }

  public constructor(
    private commentProxy: CommentProxy,
    private elementRef: ElementRef,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.initUser();
    this.loadData();
    this.calculateFooterVisibility();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  protected loadData() {
    this.commentProxy.getComments(this.resourceName, this.resourceId, {
      include: 'owner,owner.user_images,owner.company,owner.company.company_images',
      sort: '-created_at'
    })
    .then(result => {
      this.comments = result.reverse();
      this.calculateFooterVisibility();
    });
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

  private getDocumentHeight() {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public sendComment() {
    this.commentProxy.createComment(this.resourceName, this.resourceId, {
      body: this.newCommentBody,
      commentable_id: this.resourceId,
      commentable_type: this.resourceName,
      language_id: this.systemLanguagesResolver.getSelectedSystemLanguage().id,
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
}
