import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'share-modal',
  template: `
    <sm-modal
      class="basic"
      #modal>
      <modal-content>
        <basic-title-text
          [text]="'share.section.title' | translate"
          [underlineBelow]="true"
          color="pink"
          fontSize="medium"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center"
          underlineBelowColor="pink"
          underlineBelowLtrAlignment="center"
          underlineBelowRtlAlignment="center">
        </basic-title-text>
        <share-section></share-section>
      </modal-content>
    </sm-modal>`
})
export class ShareModalComponent {
  @ViewChild('modal') public modal: any;

  public show(): void {
    this.modal.show({
      autofocus: false,
      transition: 'horizontal flip'
    });
  }

  public hide(): void {
    this.modal.hide();
  }
}
