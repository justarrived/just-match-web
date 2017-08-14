import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {getDataUrl} from '../../../utils/data-url/data-url.util';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
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
        [imageUrl]="this.user && this.user[this.imageField]?.imageUrlLarge"
        [placeholderImageUrl]="placeholderImageUrl"
        [size]="size"
        [uploadingImage]="uploadingImage">
      </circular-image-input>`
})
export class UserImageCircularInputComponent extends BaseComponent {
  @Input() public centered: boolean;
  @Input() public imageField: string;
  @Input() public imageType: string;
  @Input() public placeholderImageUrl: string;
  @Input() public size: string = 'medium'; // One of ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', massive]
  public imageSaveFail: boolean;
  public imageSaveSuccess: boolean;
  public uploadingImage: boolean;

  public constructor(
    private userImageProxy: UserImageProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
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
