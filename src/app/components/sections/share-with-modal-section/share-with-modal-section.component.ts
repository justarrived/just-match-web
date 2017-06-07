import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'share-with-modal-section',
  template: `
    <div
      style="display: flex; align-items: center; cursor: pointer;"
      [style.direction]="systemLanguage.direction"
      (click)="showShareModal()">
      <img
        class="ui image"
        src="/assets/icons/social-media-share.svg"
        style="padding-left: 10px; padding-right: 10px; height: 42px;">
      <basic-title-text
        [text]="'Share' | translate"
        [oneLineEllipsis]="true"
        fontSize="small"
        color="pink"
        marginTop="0"
        marginBottom="0"
        textAlignmentLtr="left"
        textAlignmentRtl="left">
      </basic-title-text>
    </div>`
})
export class ShareWithModalSectionComponent extends BaseComponent {

  public constructor (
    private modalService: ModalService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public showShareModal() {
    this.modalService.showModal('shareModalComponent', false, false, 1);
  }
}
