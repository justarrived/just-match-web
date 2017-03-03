import {Component, OnInit, Input, HostListener, ElementRef} from '@angular/core';
import {CommentsProxy} from '../../services/proxy/comments-proxy.service';
import {Comment} from '../../models/comment';
import {UserManager} from '../../services/user-manager.service';
import {TranslationService} from '../../services/translation.service';
import {orderBy} from 'lodash';
import {TranslationListener} from '../translation.component';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends TranslationListener implements OnInit {
  @Input() private resourceId: number;
  @Input() private resourceName: string;
  private newCommentContainer: any;
  private comments: Comment[];
  private userId: string;
  private newCommentBody: string;
  private isFooterVisible: boolean;

  @HostListener('window:scroll', ['$event']) onDocumentScroll(event: any) {
    this.calculateFooterVisibility();
  }

  constructor(private commentsProxy: CommentsProxy, private userManager: UserManager, protected translationService: TranslationService, private elementRef: ElementRef) {
    super(translationService);
    this.userId = this.userManager.getUserId();
  }

  ngOnInit() {
    this.loadData();
    this.calculateFooterVisibility();
  }

  private sendComment() {
    let comment = new Comment();
    comment.commentableId = this.resourceId;
    comment.commentableType = this.resourceName;
    comment.languageId = this.translationService.getSelectedLanguage().id;
    comment.body = this.newCommentBody;
    this.commentsProxy.sendComment(this.resourceName, this.resourceId, comment.toJsonObject()).then(result => {
      this.newCommentContainer.textContent = '';
      this.newCommentBody = null;
      this.loadData();
    });
  }

  private onNewCommentInput(event) {
    if (!this.newCommentContainer) {
      this.newCommentContainer = event.target;
    }
    this.newCommentBody = event.target.textContent;
  }

  loadData() {
    this.commentsProxy.getComments(this.resourceName, this.resourceId, {
      include: 'owner,owner.user-images,owner.company,owner.company.company-images',
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
    let footerHeight = document.getElementsByTagName('footer')[0]['offsetHeight'];
    let documentHeight = this.getDocumentHeight();
    let isFooterVisibleActual = windowHeight + scrollHeight >= documentHeight - footerHeight;
    if (isFooterVisibleActual !== this.isFooterVisible) {
      this.isFooterVisible = isFooterVisibleActual;
    }
  }
}
