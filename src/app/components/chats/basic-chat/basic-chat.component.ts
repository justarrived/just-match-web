import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {ElementRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {Message} from '../../../models/api-models/message/message';
import {MessageProxy} from '../../../proxies/message/message.proxy';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'basic-chat',
  styleUrls: ['./basic-chat.component.scss'],
  template: `
    <div
      class="ui raised card"
      style="width: 100%">

      <div class="content chat-header">
        <div
          class="header"
          style="flex: 0;">
          {{chatTitle}}
        </div>
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
          <sm-loader
            [complete]="!loadingSubmit"
            [promise]="messagesPromise"
            class="inverted">
          </sm-loader>

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
export class BasicChatComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  @Input() public chatId: string;
  @Input() public chatTitle: string;
  @Input() public isInModal: boolean = false;
  @ViewChild('chatMessagesContent') public chatMessagesContent: ElementRef;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public chatForm: FormGroup;
  public messagesPromise: Promise<Message[]>;
  public loadingSubmit: boolean;
  public messages: Message[];
  public submitFail: boolean;
  public submitSuccess: boolean;
  public user: User;

  private userSubscription: Subscription;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private messageProxy: MessageProxy,
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
    this.chatForm = this.formBuilder.group({
      'body': ['']
    });
  }

  protected loadData() {
    this.messagesPromise = this.messageProxy.getChatMessages(this.chatId, {
      'include': 'author,author.user_images,author.company,author.company.company_images',
      'sort': '-created_at',
      'page[size]': 50,
    })
    .then(messages => {
      this.messages = messages.reverse();
      setTimeout(() => {
        this.scrollToBottom();
      }, 1);
      return this.messages;
    })
  }

  private scrollToBottom(): void {
    try {
      this.chatMessagesContent.nativeElement.scrollTop = this.chatMessagesContent.nativeElement.scrollHeight;
    } catch(err) {}
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
    });
  }
}
