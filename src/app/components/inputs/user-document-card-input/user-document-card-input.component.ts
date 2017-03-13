import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {User} from '../../../models/user';
import {UserProxy} from '../../../services/proxy/user-proxy.service';

@Component({
  selector: 'user-document-card-input',
  template: `
    <div class="ui field">
      <label
        *ngIf="showLabel">
        {{label}}
      </label>
      <upload-document-card
        (onFileSelect)="onUploadDocument($event)"
        [centered]="centered"
        [header]="header"
        [documentSaveFail]="documentSaveFail"
        [documentSaveSuccess]="documentSaveSuccess"
        [documents]="user && user[documentType + '_documents']?.slice(-maxNbrDocuments)"
        [subHeader]="subHeader"
        [uploadingDocument]="uploadingDocument">
      </upload-document-card>
    </div>`
})
export class UserDocumentCardInputComponent {
  @Input() public centered: boolean;
  @Input() public documentType: string;
  @Input() public header: string;
  @Input() public label: string;
  @Input() public maxNbrDocuments: number = 5;
  @Input() public showLabel: boolean;
  @Input() public subHeader: string;
  @Input() public user: User;
  public documentSaveFail: boolean;
  public documentSaveSuccess: boolean;
  public uploadingDocument: boolean;

  constructor(
    private userProxy: UserProxy
  ) {
  }

  public onUploadDocument(file) {
    this.documentSaveFail = false;
    this.documentSaveSuccess = false;
    this.uploadingDocument = true;

    this.userProxy.saveDocument(file).then((document) => {
      this.userProxy.saveUserDocument(this.user.id, document, this.documentType).then(userDocument => {
        this.user[this.documentType + '_documents'].push(userDocument);
        this.documentSaveSuccess = true;
        this.uploadingDocument = false;
      }).catch(errors => {
        this.documentSaveFail = true;
        this.uploadingDocument = false;
      });
    }).catch(errors => {
      this.documentSaveFail = true;
      this.uploadingDocument = false;
    });
  }
}
