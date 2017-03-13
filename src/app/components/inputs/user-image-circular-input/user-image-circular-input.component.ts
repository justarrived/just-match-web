import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {User} from '../../../models/user';
import {UserProxy} from '../../../services/proxy/user-proxy.service';

@Component({
  selector: 'user-image-circular-input',
  template: `
      <circular-image-input
        (onFileSelect)="onUploadImage($event)"
        [centered]="centered"
        [imageSaveFail]="imageSaveFail"
        [imageSaveSuccess]="imageSaveSuccess"
        [imageUrl]="this.user && this.user[this.imageType + '_image']?.mediumImageUrl"
        [size]="size"
        [uploadingImage]="uploadingImage">
      </circular-image-input>`
})
export class UserImageCircularInputComponent {
  @Input() public centered: boolean;
  @Input() public imageType: string;
  @Input() public size: string = 'medium'; // One of ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', massive]
  @Input() public user: User;
  public imageSaveFail: boolean;
  public imageSaveSuccess: boolean;
  public uploadingImage: boolean;


  constructor(
    private userProxy: UserProxy
  ) {
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
