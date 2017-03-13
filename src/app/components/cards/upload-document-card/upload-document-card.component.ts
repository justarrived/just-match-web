import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {UserDocument} from '../../../models/user/user-document';

@Component({
  selector: 'upload-document-card',
  styleUrls: ['./upload-document-card.component.scss'],
  template: `
    <div
      class="ui raised card"
      [ngClass]="{'centered': centered}">
    <sm-loader
      [complete]="!uploadingDocument"
      class="inverted"
      text="{{'component.loading' | translate}}">
    </sm-loader>
    <div class="content">
      <div
        class="ui pink header"
        [style.margin-bottom]="0">
        {{header}}
      </div>
    </div>
    <div class="content">
      <h4
        class="ui sub header">
        {{subHeader}}
      </h4>
      <div class="ui center aligned padded basic segment">
        <div *ngFor="let document of documents">
          <a
            [href]="document?.document.documentUrl"
            target="_blank">
            <i class="fa fa-file-text"></i>
            {{document.createdAt | date: 'yyyy-MM-dd HH:mm'}}
          </a>
        </div>
        <div *ngIf="documents.length < 1">
          {{'card.document.upload.empty.documents' | translate}}
        </div>
      </div>
    </div>
    <div
      [style.padding-bottom]="0"
      [style.padding-top]="0"
      class="extra content">
      <file-input-button
        (onChange)="onDocumentFilenameChange($event)"
        [fluid]="true"
        icon="upload"
        kind="primary"
        size="small">
      </file-input-button>
    </div>
  </div>`
})
export class UploadDocumentCardComponent {
  @Input() public centered: boolean;
  @Input() public documents: UserDocument[];
  @Input() public documentSaveFail: boolean;
  @Input() public documentSaveSuccess: boolean;
  @Input() public header: string;
  @Input() public subHeader: string;
  @Input() public uploadingDocument: boolean;
  @Output() public onFileSelect: EventEmitter<any> = new EventEmitter();

  public onDocumentFilenameChange(event) {
    const file = event.srcElement.files[0];
    if (!file) {
      return;
    }

    this.onFileSelect.emit(file);
  }
}
