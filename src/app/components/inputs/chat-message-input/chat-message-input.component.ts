import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'chat-message-input',
  template: `
  <textarea-input
    (onEnterKeyUp)="onEnterKeyUp.emit()"
    [apiErrors]="apiErrors"
    [control]="control"
    [hint]="hint"
    [paddingBottom]="0"
    [placeholder]="'input.chat.message.placeholder' | translate"
    [rows]="1"
    apiAttribute="body">
  </textarea-input>
  `
})
export class ChatMessageInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
  @Output() onEnterKeyUp: EventEmitter<any> = new EventEmitter<any>();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
