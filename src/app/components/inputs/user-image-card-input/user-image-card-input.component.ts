import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {User} from '../../../models/user';
import {UserProxy} from '../../../services/proxy/user-proxy.service';

@Component({
  selector: 'user-image-card-input',
  template: `
    <div class="ui field">
      <label
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
        [imageUniqueName]="imageUniqueName"
        [imageUrl]="this.user && this.user[this.imageType + '_image']?.mediumImageUrl"
        [subHeader]="subHeader"
        [uploadingImage]="uploadingImage">
      </upload-image-card>
    </div>`
})
export class UserImageCardInputComponent {
  @Input() public centered: boolean;
  @Input() public description: string;
  @Input() public header: string;
  @Input() public imageType: string;
  @Input() public imageUniqueName: string;
  @Input() public label: string;
  @Input() public showLabel: boolean;
  @Input() public subHeader: string;
  @Input() public user: User;
  public imageSaveFail: boolean;
  public imageSaveSuccess: boolean;
  public uploadingImage: boolean;

  constructor(
    private userProxy: UserProxy
  ) {
  }

  onUploadImage(file) {
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
