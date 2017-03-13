import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';

@Component({
  selector: 'upload-image-card',
  styleUrls: ['./upload-image-card.component.scss'],
  template: `
    <div
      class="ui raised card"
      [ngClass]="{'centered': centered}">
      <sm-loader
        [complete]="!uploadingImage"
        class="inverted"
        text="{{'component.loading' | translate}}">
      </sm-loader>
      <div class="image">
        <img
          [src]="imageUrl"
          *ngIf="imageUrl">
        <img
          *ngIf="!imageUrl"
          src="/assets/images/image.png">
      </div>
      <div class="content">
        <div
          class="ui pink header"
          [style.margin-bottom]="0">
          {{header}}
        </div>
        <div class="meta">
          <span class="date">
            {{subHeader}}
          </span>
        </div>
        <div class="description">
          {{description}}
        </div>
      </div>
      <div
        [style.padding-bottom]="0"
        [style.padding-top]="0"
        class="extra content">
        <file-input-button
          (onChange)="onImageFilenameChange($event)"
          [fluid]="true"
          accept="image/jpeg,image/jpg,image/gif,image/png"
          icon="upload"
          kind="primary"
          size="small">
        </file-input-button>
      </div>
    </div>`
})
export class UploadImageCardComponent {
  @Input() public centered: boolean;
  @Input() public description: string;
  @Input() public header: string;
  @Input() public imageSaveFail: boolean;
  @Input() public imageSaveSuccess: boolean;
  @Input() public imageUrl: string;
  @Input() public subHeader: string;
  @Input() public uploadingImage: boolean;
  @Output() public onFileSelect: EventEmitter<any> = new EventEmitter();

  onImageFilenameChange(event) {
    const file = event.srcElement.files[0];
    if (!file) {
      return;
    }

    this.onFileSelect.emit(file);
  }
}
