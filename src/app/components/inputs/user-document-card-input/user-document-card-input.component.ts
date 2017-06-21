import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {DocumentProxy} from '../../../proxies/document/document.proxy';
import {getDataUrl} from '../../../utils/data-url/data-url.util';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserDocumentProxy} from '../../../proxies/user-document/user-document.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';

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
        [hint]="hint"
        [documentSaveFail]="documentSaveFail"
        [documentSaveSuccess]="documentSaveSuccess"
        [documents]="user && user[documentsField]?.slice(0, maxNbrDocuments)"
        [description]="description"
        [uploadingDocument]="uploadingDocument">
      </upload-document-card>
    </div>`
})
export class UserDocumentCardInputComponent extends BaseComponent {
  @Input() public centered: boolean;
  @Input() public documentsField: string;
  @Input() public documentType: string;
  @Input() public header: string;
  @Input() public hint: string;
  @Input() public label: string;
  @Input() public maxNbrDocuments: number = 5;
  @Input() public showLabel: boolean;
  @Input() public description: string;

  public documentSaveFail: boolean;
  public documentSaveSuccess: boolean;
  public uploadingDocument: boolean;

  public constructor(
    private documentProxy: DocumentProxy,
    private userDocumentProxy: UserDocumentProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onUploadDocument(file) {
    this.documentSaveFail = false;
    this.documentSaveSuccess = false;
    this.uploadingDocument = true;

    getDataUrl(file)
    .then(dataUrl => {
      this.documentProxy.createDocument({
        document: dataUrl
      })
      .then(document => {

        this.userDocumentProxy.createUserDocument(this.user.id, {
          'category': this.documentType,
          'document_one_time_token': document.oneTimeToken,
        })
        .then(userDocument => {
          userDocument.document = document;
          this.user[this.documentsField].unshift(userDocument);
          this.documentSaveSuccess = true;
          this.uploadingDocument = false;
        })
        .catch(errors => {
          this.documentSaveFail = true;
          this.uploadingDocument = false;
        });

      })
      .catch(errors => {
        this.documentSaveFail = true;
        this.uploadingDocument = false;
      });
    })
    .catch(errors => {
      this.documentSaveFail = true;
      this.uploadingDocument = false;
    });
  }
}
