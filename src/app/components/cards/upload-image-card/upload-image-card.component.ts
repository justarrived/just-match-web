import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'upload-image-card',
  styleUrls: ['./upload-image-card.component.scss'],
  template: `
    <div
      class="ui raised card"
      [ngClass]="{'centered': centered}">
      <basic-loader
        [complete]="!uploadingImage"
        class="inverted">
      </basic-loader>
      <div class="image">
        <img
          [src]="imageUrl"
          *ngIf="imageUrl">
        <img
          *ngIf="!imageUrl"
          src="/assets/images/image.png">
      </div>
      <div class="content">
        <basic-title-text
          [text]="header"
          [maxiumLinesEllipsis]="2"
          color="pink"
          fontSize="small"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
        <basic-text
          [text]="description"
          [maxiumLinesEllipsis]="2"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
      </div>
      <div
        [style.padding-bottom]="0"
        [style.padding-top]="0"
        class="extra content">
        <file-input-button
          (onChange)="onImageFilenameChange($event)"
          [fluid]="true"
          accept="image/jpeg,image/png"
          icon="upload"
          kind="primary"
          size="small">
        </file-input-button>
      </div>
    </div>`
})
export class UploadImageCardComponent extends BaseComponent {
  @Input() public centered: boolean;
  @Input() public description: string;
  @Input() public header: string;
  @Input() public imageSaveFail: boolean;
  @Input() public imageSaveSuccess: boolean;
  @Input() public imageUrl: string;
  @Input() public uploadingImage: boolean;
  @Output() public onFileSelect: EventEmitter<any> = new EventEmitter();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  onImageFilenameChange(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    this.onFileSelect.emit(file);
  }
}
