import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/user';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-image-card-input',
  template: `
    <div class="ui field">
      <label
        [ngStyle]="{'text-align': (centered && 'center') || 'left'}"
        *ngIf="showLabel">
        {{label}}
      </label>
      <upload-image-card
        (onFileSelect)="onUploadImage($event)"
        [centered]="centered"
        [description]="description"
        [header]="header"
        [imageSaveFail]="imageSaveFail"
        [imageSaveSuccess]="imageSaveSuccess"
        [imageUrl]="this.user && this.user[this.imageType + '_image']?.mediumImageUrl"
        [subHeader]="subHeader"
        [uploadingImage]="uploadingImage">
      </upload-image-card>
    </div>`
})
export class UserImageCardInputComponent implements OnInit, OnDestroy {
  @Input() public centered: boolean;
  @Input() public description: string;
  @Input() public header: string;
  @Input() public imageType: string;
  @Input() public label: string;
  @Input() public showLabel: boolean;
  @Input() public subHeader: string;
  public imageSaveFail: boolean;
  public imageSaveSuccess: boolean;
  public uploadingImage: boolean;
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

  public onUploadImage(file) {
    this.imageSaveFail = false;
    this.imageSaveSuccess = false;
    this.uploadingImage = true;

    this.userProxy.saveImage(this.user.id, file, this.imageType).then(userImage => {
      this.user[this.imageType + '_image'] = userImage;
      this.imageSaveSuccess = true;
      this.uploadingImage = false;
    }).catch(errors => {
      this.imageSaveFail = true;
      this.uploadingImage = false;
    });
  }
}
