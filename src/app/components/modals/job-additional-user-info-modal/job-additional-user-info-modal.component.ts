import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {MissingUserTraits} from '../../../models/api-models/missing-user-traits/missing-user-traits';
import {Output} from '@angular/core';
import {UserUpdateFormComponent} from '../../forms/user-update-form/user-update-form.component';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'job-additional-user-info-modal',
  template: `
    <sm-modal
      #jobAdditionalUserInfoModal
      [title]="'job.additional.user.info.modal.title' | translate"
      icon="massive pink user">
      <modal-content>
        <div class="ui centered grid">
          <div class="sixteen wide phone twelve wide tablet twelve wide computer column">
            <user-update-form
              #userUpdateForm
              [showSubmitButton]="false"
              [missingUserTraits]="missingUserTraits">
            </user-update-form>
          </div>
        </div>
      </modal-content>
      <modal-actions>
        <div class="ui center aligned basic segment button-container">
          <base-button
            (click)="buttonClicked()"
            [buttonText]="'job.additional.user.info.modal.button' | translate"
            buttonType="submit"
            kind="primary"
            size="medium">
          </base-button>
        </div>
      </modal-actions>
    </sm-modal>`
})
export class JobAdditionalUserInfoModalComponent {
  @Input() public missingUserTraits = null as MissingUserTraits;

  @Output() public onInformationSupplied = new EventEmitter();
  @ViewChild('jobAdditionalUserInfoModal') public jobAdditionalUserInfoModal: any;
  @ViewChild('userUpdateForm') public userUpdateForm: UserUpdateFormComponent;

  public show(): void {
    this.jobAdditionalUserInfoModal.show({
      autofocus: false,
      transition: 'horizontal flip'
    });
  }

  public hide(): void {
    this.jobAdditionalUserInfoModal.hide();
  }

  public buttonClicked(): void {
    this.userUpdateForm.onSubmit()
    .then(() => this.onInformationSupplied.emit());
  }
}
