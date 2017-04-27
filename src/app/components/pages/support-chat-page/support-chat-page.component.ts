import {Component} from '@angular/core';

@Component({
  template: `
  <basic-border-header
    [header]="'support.chat.page.title' | translate"
    icon="comments">
  </basic-border-header>
  <div class="ui centered grid">
    <div class="sixteen wide phone ten wide tablet eight wide computer column">
      <support-chat></support-chat>
    </div>
  </div>
  `
})
export class SupportChatPageComponent {}
