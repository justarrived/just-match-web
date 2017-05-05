import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Output} from '@angular/core';

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
export class ChatMessageInputComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
  @Output() onEnterKeyUp: EventEmitter<any> = new EventEmitter<any>();
}
