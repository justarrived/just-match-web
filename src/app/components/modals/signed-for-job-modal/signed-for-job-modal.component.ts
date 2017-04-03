import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {Input} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'signed-for-job-modal',
  template: `
    <confirmation-modal
      [description]="'confirmation.signed.for.job.description' | translate"
      [header]="'confirmation.signed.for.job.title' | translate"
      icon="massive pink check"
      #confirmationModal>
    </confirmation-modal>`
})
export class SignedForJobModalComponent {
  @ViewChild('confirmationModal') public confirmationModal: ConfirmationModalComponent;

  public show() {
    this.confirmationModal.show({
      transition: 'horizontal flip'
    });
  }

  public hide() {
    this.confirmationModal.show();
  }
}
