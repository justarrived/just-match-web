import {Component} from '@angular/core';

@Component({
  styleUrls: ['./support-chat-page.component.scss'],
  template: `
  <basic-border-header
    [header]="'support.chat.page.title' | translate"
    icon="comments">
  </basic-border-header>
  <div class="ui centered grid chat-container">
    <div class="sixteen wide column">
      <support-chat></support-chat>
    </div>
  </div>
  `
})
export class SupportChatPageComponent {}
