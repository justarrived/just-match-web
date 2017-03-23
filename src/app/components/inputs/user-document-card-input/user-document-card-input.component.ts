import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-document-card-input',
  template: `
    <div class="ui field">
      <label
        [ngStyle]="{'text-align': (centered && 'center') || 'left'}"
        *ngIf="showLabel">
        {{label}}
      </label>
      <upload-document-card
        (onFileSelect)="onUploadDocument($event)"
        [centered]="centered"
        [header]="header"
        [documentSaveFail]="documentSaveFail"
        [documentSaveSuccess]="documentSaveSuccess"
        [documents]="user && user[documentsField]?.slice(-maxNbrDocuments)"
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
    private userProxy: UserProxy,
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
    this.userSubscription.unsubscribe();
  }

  public onUploadDocument(file) {
    this.documentSaveFail = false;
    this.documentSaveSuccess = false;
    this.uploadingDocument = true;

    this.userProxy.saveDocument(file).then((document) => {
      this.userProxy.saveUserDocument(this.user.id, document, this.documentType).then(userDocument => {
        this.user[this.documentsField].push(userDocument);
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
