import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'share-with-modal-section',
  styleUrls: ['./share-with-modal-section.component.scss'],
  template: `
    <div
      class="share-container"
      style="display: flex; align-items: center; cursor: pointer;"
      [style.direction]="systemLanguage.direction"
      (click)="showShareModal()">
      <div class="icon"></div>
      <basic-title-text
        [text]="'share.with.modal.section.title' | translate"
        [oneLineEllipsis]="true"
        fontSize="medium"
        color="pink"
        marginTop="0"
        marginBottom="0"
        textAlignmentLtr="left"
        textAlignmentRtl="left"
        style="margin-left: 10px; margin-right: 10px;">
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
