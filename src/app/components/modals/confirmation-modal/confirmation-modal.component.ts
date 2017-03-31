import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  styleUrls: ['./confirmation-modal.component.scss'],
  template: `
    <sm-modal
      [icon]="icon"
      #confirmationModal>
      <modal-content>
        <div class="ui center aligned basic segment">
          <h3>{{header}}</h3>
          <p>{{description}}</p>
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
    </sm-modal>`
})
export class ConfirmationModalComponent {
  @Input() public description: string;
  @Input() public header: string;
  @Input() public icon: string;

  @ViewChild('confirmationModal') public confirmationModal: any;

  public show(options?: any) {
    this.confirmationModal.show(options);
  }

  public hide() {
    this.confirmationModal.hide();
  }
}
