import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'welcome-step-1-modal',
  template: `
    <step-modal
      #modal
      nextModal="welcomeStep2ModalComponent">
      <modal-header>
        <basic-title-text
          [text]="'welcome-step-1-modal-header' | translate: {username: user.name}"
          color="white"
          fontSize="huge"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </modal-header>
      <modal-content>
        <basic-title-text
          [text]="'welcome-step-1-modal-title' | translate"
          color="black"
          fontSize="huge"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
        <div style="max-width: 500px;">
          <basic-text
            [unsafeHtml]="'<ul><li>' + ('welcome-step-1-modal-point-1' | translate) + '</li><ul>'"
            color="gray">
          </basic-text>
          <basic-text
            [unsafeHtml]="'<ul><li>' + ('welcome-step-1-modal-point-2' | translate) + '</li><ul>'"
            color="gray">
          </basic-text>
          <basic-text
            [unsafeHtml]="'<ul><li>' + ('welcome-step-1-modal-point-3' | translate) + '</li><ul>'"
            color="gray">
          </basic-text>
          <basic-text
            [unsafeHtml]="'<ul><li>' + ('welcome-step-1-modal-point-4' | translate) + '</li><ul>'"
            color="gray">
          </basic-text>
        </div>
      </modal-content>
    </step-modal>`
})
export class WelcomeStep1ModalComponent extends BaseComponent {
  @ViewChild('modal') public modal: any;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public show() {
    this.modal.show();
  }

  public hide() {
    this.modal.hide();
  }
}
