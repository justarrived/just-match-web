import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'share-modal',
  template: `
    <basic-modal
      class="basic"
      #modal>
      <modal-content (click)="hide()">
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
    </basic-modal>`
})
export class ShareModalComponent extends BaseComponent {
  @ViewChild('modal') public modal: any;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

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
