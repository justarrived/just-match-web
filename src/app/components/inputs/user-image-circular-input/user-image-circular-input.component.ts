import {Component} from '@angular/core';
import {getDataUrl} from '../../../utils/data-url.util';
import {Input} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserImageProxy} from '../../../proxies/user-image/user-image.proxy';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-image-circular-input',
  template: `
      <circular-image-input
        (onFileSelect)="onUploadImage($event)"
        [centered]="centered"
        [imageSaveFail]="imageSaveFail"
        [imageSaveSuccess]="imageSaveSuccess"
        [imageUrl]="this.user && this.user[this.imageField]?.mediumImageUrl"
        [placeholderImageUrl]="placeholderImageUrl"
        [size]="size"
        [uploadingImage]="uploadingImage">
      </circular-image-input>`
})
export class UserImageCircularInputComponent implements OnInit, OnDestroy {
  @Input() public centered: boolean;
  @Input() public imageField: string;
  @Input() public imageType: string;
  @Input() public placeholderImageUrl: string;
  @Input() public size: string = 'medium'; // One of ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', massive]
  public imageSaveFail: boolean;
  public imageSaveSuccess: boolean;
  public uploadingImage: boolean;
  public user: User;
  private userSubscription: Subscription;

  public constructor(
    private userImageProxy: UserImageProxy,
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

    getDataUrl(file)
    .then(dataUrl => {
      this.userImageProxy.createUserImage(this.user.id, {
        'category': this.imageType,
        'image': dataUrl,
      })
      .then(userImage => {
        this.user[this.imageField] = userImage;
        this.imageSaveSuccess = true;
        this.uploadingImage = false;
      })
      .catch(errors => {
        this.imageSaveFail = true;
        this.uploadingImage = false;
      });
    })
    .catch(errors => {
      this.imageSaveFail = true;
      this.uploadingImage = false;
    });
  }
}
