import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Comment} from '../../../models/api-models/comment/comment';
import {CommentProxy} from '../../../proxies/comment/comment.proxy';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {isThisWeek} from '../../../utils/date/date.util';
import {isToday} from '../../../utils/date/date.util';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'comments-form',
  template: `
    <div
      class="ui comments"
      style="margin: 0 auto; max-width: 500px; padding-bottom: 30px">
      <div
        *ngFor="let comment of comments"
        class="comment">
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
      </div>
    </div>
    <form
      (ngSubmit)="submitForm()"
      [formGroup]="commentForm"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </sm-loader>

      <comment-input
        [control]="commentForm.controls['body']"
        [apiErrors]="apiErrors">
      </comment-input>

      <form-submit-button
        [buttonText]="'comment.form.submit.button' | translate"
        [showSuccessMessage]="false"
        [showErrorMessage]="false"
        [showButton]="!isInModal"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        kind="primary">
      </form-submit-button>
    </form>`
})
export class CommentsFormComponent extends SystemLanguageListener implements OnInit {
  @Input() public isInModal: boolean = false;
  @Input() public resourceId: string;
  @Input() public resourceName: string;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public commentForm: FormGroup;
  public comments: Comment[];
  public isThisWeek = isThisWeek;
  public isToday = isToday;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private commentProxy: CommentProxy,
    private formBuilder: FormBuilder,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.initForm();
    this.loadData();
  }


  private initForm(): void {
    this.commentForm = this.formBuilder.group({
      'body': ['']
    });
  }

  protected loadData() {
    this.commentProxy.getComments(this.resourceName, this.resourceId, {
      'include': 'owner,owner.user_images,owner.company,owner.company.company_images',
      'sort': '-created_at',
      'page[size]': 50
    })
    .then(comments => {
      this.comments = comments.reverse();
    })
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<Comment> {
    this.submitFail = false;
    this.submitSuccess = false;
    this.loadingSubmit = true;

    return this.commentProxy.createComment(this.resourceName, this.resourceId, {
      body: this.commentForm.value.body,
      commentable_id: this.resourceId,
      commentable_type: this.resourceName
    })
    .then(comment => {
      this.initForm();
      this.loadData();
      this.loadingSubmit = false;
      this.submitSuccess = true;
      return comment;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      if (this.isInModal) {
        throw errors;
      }
    });
  }
}
