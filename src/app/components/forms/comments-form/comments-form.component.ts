import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Comment} from '../../../models/api-models/comment/comment';
import {CommentProxy} from '../../../proxies/comment/comment.proxy';
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'comments-form',
  template: `
    <div style="margin: 0 auto; max-width: 500px; padding-bottom: 30px">
      <basic-comments [comments]="comments" ></basic-comments>
    </div>

    <form
      (ngSubmit)="submitForm()"
      [formGroup]="commentForm"
      *ngIf="user"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        [promise]="commentsPromise"
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
export class CommentsFormComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  @Input() public isInModal: boolean = false;
  @Input() public resourceId: string;
  @Input() public resourceName: string;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public commentForm: FormGroup;
  public commentsPromise: Promise<Comment[]>;
  public comments: Comment[];
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public user: User;
  private userSubscription: Subscription;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private commentProxy: CommentProxy,
    private formBuilder: FormBuilder,
    private userResolver: UserResolver,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.initUser();
    this.initForm();
    this.loadData();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  private initForm(): void {
    this.commentForm = this.formBuilder.group({
      'body': ['']
    });
  }

  protected loadData() {
    this.commentsPromise = this.commentProxy.getComments(this.resourceName, this.resourceId, {
      'include': 'owner,owner.user_images,owner.company,owner.company.company_images',
      'sort': '-created_at',
      'page[size]': 50
    })
    .then(comments => {
      this.comments = comments.reverse();
      return this.comments;
    })
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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
