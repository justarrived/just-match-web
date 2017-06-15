import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  styleUrls: ['./confirmation-modal.component.scss'],
  template: `
    <base-modal
      [icon]="icon"
      #confirmationModal>
      <modal-content>
        <img
          [src]="image"
          *ngIf="image"
          class="ui {{imageClasses}} image">
        <div class="ui center aligned basic segment">
          <basic-title-text
            [text]="header"
            color="black"
            fontSize="large"
            marginTop="0"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-title-text>
          <basic-text
            [text]="description"
            color="black"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
        </div>
      </modal-content>
      <modal-actions>
        <div class="ui center aligned basic segment button-container">
          <base-button
            [buttonText]="'common.close' | translate"
            kind="primary"
            (click)="confirmationModal.hide()"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </base-modal>`
})
export class ConfirmationModalComponent extends BaseComponent {
  @Input() public description: string;
  @Input() public header: string;
  @Input() public icon: string;
  @Input() public image: string;
  @Input() public imageClasses: string;

  @ViewChild('confirmationModal') public confirmationModal: any;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public show(options?: any) {
    this.confirmationModal.show(options);
  }

  public hide() {
    this.confirmationModal.hide();
  }
}
