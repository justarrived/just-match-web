import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserDocument} from '../../../models/api-models/user-document/user-document';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'upload-document-card',
  styleUrls: ['./upload-document-card.component.scss'],
  template: `
    <div
      class="ui raised card"
      [ngClass]="{'centered': centered}">
      <basic-loader
        [complete]="!uploadingDocument"
        class="inverted">
      </basic-loader>
      <div class="content">
        <basic-title-text
          [text]="header"
          [maxiumLinesEllipsis]="2"
          color="pink"
          fontSize="small"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
        <basic-text
          [text]="description"
          [maxiumLinesEllipsis]="2"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
      </div>
      <div class="content">
        <div class="ui center aligned padded basic segment">
          <div *ngFor="let document of documents">
            <basic-link
              [alwaysLtrText]="true"
              [href]="document?.document?.documentUrl"
              [text]="document.createdAt | date: 'yyyy-MM-dd HH:mm'"
              color="gray"
              fontWeight="bold"
              hoverColor="pink"
              marginBottom="0"
              marginTop="0"
              textAlignmentLtr="center"
              textAlignmentRtl="center">
            </basic-link>
          </div>
          <basic-text
            [text]="'card.document.upload.empty.documents' | translate"
            *ngIf="documents.length < 1"
            color="gray"
            fontWeight="bold"
            hoverColor="pink"
            marginBottom="0"
            marginTop="0"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
        </div>
      </div>
      <div
        [style.padding-bottom]="0"
        [style.padding-top]="0"
        class="extra content">
        <file-input-button
          (onChange)="onDocumentFilenameChange($event)"
          [fluid]="true"
          accept="application/pdf,application/msword,application/zip,application/x-ole-storage,application/vnd.oasis.opendocument.text,text/plain,application/rtf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          icon="upload"
          kind="primary"
          size="small">
        </file-input-button>
      </div>
    </div>
    <input-hint-label [hint]="hint"></input-hint-label>`
})
export class UploadDocumentCardComponent extends BaseComponent {
  @Input() public centered: boolean;
  @Input() public documents: UserDocument[];
  @Input() public documentSaveFail: boolean;
  @Input() public documentSaveSuccess: boolean;
  @Input() public header: string;
  @Input() public hint: string;
  @Input() public description: string;
  @Input() public uploadingDocument: boolean;
  @Output() public onFileSelect: EventEmitter<any> = new EventEmitter();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onDocumentFilenameChange(event) {
    const file = event.srcElement.files[0];
    if (!file) {
      return;
    }

    this.onFileSelect.emit(file);
  }
}
