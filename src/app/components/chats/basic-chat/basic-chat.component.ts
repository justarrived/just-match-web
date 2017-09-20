import 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {ElementRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Inject} from '@angular/core';
import {Input} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Language} from '../../../models/api-models/language/language';
import {Message} from '../../../models/api-models/message/message';
import {MessageProxy} from '../../../proxies/message/message.proxy';
import {Observable} from 'rxjs/Rx';
import {Params} from '@angular/router';
import {PLATFORM_ID} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'basic-chat',
  styleUrls: ['./basic-chat.component.scss'],
  template: `
    <div
      class="ui raised card"
      style="width: 100%; height: 100%;">

      <div
        class="content chat-header"
        style="flex-grow: 0; padding-top: 0; padding-bottom: 5px;">
        <div
          class="header"
          style="flex: 0; margin-top: 10px; margin-bottom: 5px;">
          <img
            alt="Just Arrived"
            class="ui small image"
            src="/assets/images/logo.png"/>
        </div>
        <info-message
          [closeable]="true"
          [header]="infoMessageHeader"
          [description]="infoMessageDescription"
          *ngIf="infoMessageHeader"
          icon="warning">
        </info-message>
      </div>

      <div
        #chatMessagesContent
        class="content"
        style="height: 400px; display: flex; flex-direction: column-reverse; overflow-y: scroll;">
        <basic-chat-messages [messages]="messages"></basic-chat-messages>
      </div>

      <div class="extra content">
        <form
          (keydown.enter)="false"
          (ngSubmit)="submitForm()"
          [formGroup]="chatForm"
          class="ui form"
          style="display: flex; align-items: center;">
          <basic-loader
            [complete]="!loadingSubmit"
            [promise]="messagesPromise"
            class="inverted">
          </basic-loader>

          <chat-message-input
            (onEnterKeyUp)="chatForm.value.body && submitForm()"
            [apiErrors]="apiErrors"
            [control]="chatForm.controls['body']"
            style="flex: 1; padding-right: 20px;">
          </chat-message-input>

          <circular-icon-base-button
            [disabled]="!chatForm.value.body"
            icon="chevron circle right"
            buttonType="submit"
            color="pink">
          </circular-icon-base-button>
        </form>
      </div>
    </div>`
})
export class BasicChatComponent extends BaseComponent {
  @Input() public chatId: string;
  @Input() public infoMessageDescription: string;
  @Input() public infoMessageHeader: string;
  @Input() public isInModal: boolean = false;
  @ViewChild('chatMessagesContent') public chatMessagesContent: ElementRef;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public chatForm: FormGroup;
  public loadingSubmit: boolean;
  public messagesPromise: Promise<Message[]>;
  public messages: Message[];
  public submitFail: boolean;
  public submitSuccess: boolean;

  private queryParamsSubscription: Subscription;
  private messagesSubscription: Subscription;
  private readonly pollMessagesInterval: number = 1000;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private messageProxy: MessageProxy,
    private route: ActivatedRoute,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.initForm();
    this.loadData();
  }

  private initQueryParamsSubscription(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const messageId = params['message_id'];
      if (isPlatformBrowser(this.platformId)) {
        const element = document.querySelector("#message" + messageId);
        if (element) {
          element.scrollIntoView(true);
        }
      }
    });
  }

  private initForm(): void {
    this.chatForm = this.formBuilder.group({
      'body': ['']
    });
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData() {
    this.messagesPromise = this.getChatMessages()
    .then(messages => {
      this.messages = messages.reverse();
      setTimeout(() => {
        this.scrollToBottom();
        if (!this.queryParamsSubscription) {
          this.initQueryParamsSubscription();
        }
      }, 1);
      return this.messages;
    });

    if (!this.messagesSubscription && isPlatformBrowser(this.platformId)) {
      this.messagesSubscription = Observable.interval(this.pollMessagesInterval)
      .switchMap(() => this.getChatMessages())
      .subscribe(messages => {
        messages = messages.reverse();
        if (messages[0] && this.messages[0] && messages[0].id !== this.messages[0].id) {
          this.messages = messages;
          setTimeout(() => {
            this.scrollToBottom();
          }, 1);
        }
        return this.messages;
      });
    }
  }

  private getChatMessages(): Promise<Message[]> {
    return this.messageProxy.getChatMessages(this.chatId, {
      'include': 'author,author.user_images,author.company,author.company.company_images,language',
      'sort': '-created_at',
      'page[size]': 50,
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatMessagesContent.nativeElement.scrollTop = this.chatMessagesContent.nativeElement.scrollHeight;
    } catch(err) {}
  }

  public onDestroy(): void {
    if (this.messagesSubscription) { this.messagesSubscription.unsubscribe(); }
    if (this.queryParamsSubscription) { this.queryParamsSubscription.unsubscribe(); }
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<Message> {
    this.submitFail = false;
    this.submitSuccess = false;
    this.loadingSubmit = true;

    return this.messageProxy.createChatMessage(this.chatId, {
      body: this.chatForm.value.body
    })
    .then(message => {
      this.initForm();
      this.loadData();
      this.loadingSubmit = false;
      this.submitSuccess = true;
      return message;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      if (this.isInModal) {
        throw errors;
      }
      return null;
    });
  }
}
