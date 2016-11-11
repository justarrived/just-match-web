import {Component, OnInit, Input, HostListener, ElementRef} from "@angular/core";
import {CommentsProxy} from "../../services/proxy/comments-proxy.service";
import {Comment} from "../../models/comment";
import {UserManager} from "../../user-manager.service";
import {TranslationService} from "../../services/translation.service";

@Component({
  moduleId: module.id,
  selector: 'comments',
  templateUrl: 'comments.component.html',
  styleUrls: ['comments.component.css'],
  providers: [CommentsProxy]
})
export class CommentsComponent implements OnInit {
  @Input() resourceId: number;
  @Input() resourceName: string;
  private newCommentContainer: any;
  comments: Comment[];
  userId: string;
  newCommentBody: string;
  isFooterVisible: boolean;

  @HostListener('window:scroll', ['$event']) onDocumentScroll(event: Event) {
    let scrollHeight = event.srcElement.getElementsByTagName('body')[0]['scrollTop'];
    let windowHeight = window.innerHeight;
    let footerHeight = event.srcElement.getElementsByTagName('footer')[0]['offsetHeight'];
    let documentHeight = this.getDocumentHeight();
    let isFooterVisibleActual = windowHeight + scrollHeight >= documentHeight - footerHeight;
    if (isFooterVisibleActual !== this.isFooterVisible) {
      this.isFooterVisible = isFooterVisibleActual;
    }
  }

  constructor(private commentsProxy: CommentsProxy, private userManager: UserManager, private translationService: TranslationService, private elementRef: ElementRef) {
    this.userId = this.userManager.getUserId();
  }

  ngOnInit() {
    this.commentsProxy.getComments(this.resourceName, this.resourceId, {
      include: 'owner,owner.user-images,owner.company,owner.company.company-images',
      sort: 'created_at'
    }).then(result => {
      this.comments = result.data;
    });
  }

  sendComment() {
    var comment = new Comment();
    comment.commentableId = this.resourceId;
    comment.commentableType = this.resourceName;
    comment.languageId = this.translationService.getSelectedLanguage().id;
    comment.body = this.newCommentBody;
    this.commentsProxy.sendComment(this.resourceName, this.resourceId, comment.toJsonObject()).then(result => {
      this.newCommentContainer.textContent = '';
      this.newCommentBody = null;
      this.ngOnInit();
    });
  }

  onNewCommentInput(event) {
    if (!this.newCommentContainer) {
      this.newCommentContainer = event.target;
    }
    this.newCommentBody = event.target.textContent;
  }

  private getDocumentHeight() {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  }
}
