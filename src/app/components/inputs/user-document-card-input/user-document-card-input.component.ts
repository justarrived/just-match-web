import {Component} from '@angular/core';
import {getDataUrl} from '../../../utils/data-url/data-url.util';
import {Input} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {DocumentProxy} from '../../../proxies/document/document.proxy';
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
        [subHeader]="subHeader"
        [uploadingDocument]="uploadingDocument">
      </upload-document-card>
    </div>`
})
export class UserDocumentCardInputComponent implements OnInit, OnDestroy {
  @Input() public centered: boolean;
  @Input() public documentsField: string;
  @Input() public documentType: string;
  @Input() public header: string;
  @Input() public hint: string;
  @Input() public label: string;
  @Input() public maxNbrDocuments: number = 5;
  @Input() public showLabel: boolean;
  @Input() public subHeader: string;

  public documentSaveFail: boolean;
  public documentSaveSuccess: boolean;
  public uploadingDocument: boolean;
  public user: User;

  private userSubscription: Subscription;

  public constructor(
    private documentProxy: DocumentProxy,
    private userDocumentProxy: UserDocumentProxy,
    private userResolver: UserResolver
  ) {
  }

  public ngOnInit(): void {
    this.initUser();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy(): void {
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
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
