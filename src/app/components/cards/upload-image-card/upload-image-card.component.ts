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
        <img *ngIf="imageUrl" [src]="imageUrl">
        <img *ngIf="!imageUrl"  src="/assets/images/image.png">
      </div>
      <div class="content">
        <a
          class="header">
          {{header}}
        </a>
        <div class="meta">
          <span class="date">
            {{subHeader}}
          </span>
        </div>
        <div class="description">
          {{description}}
        </div>
      </div>
      <div class="extra content">
        <label
          [for]="imageUniqueName"
          class="circular fluid ui pink icon button">
          <i class="icon upload"></i>
        </label>
        <input
          (change)="onImageFilenameChange($event)"
          [id]="imageUniqueName"
          accept="image/jpeg,image/jpg,image/gif,image/png"
          style="display: none"
          type="file"/>
      </div>
    </div>`
})
export class UploadImageCardComponent {
  @Input() public centered: boolean;
  @Input() public description: string;
  @Input() public header: string;
  @Input() public imageSaveFail: boolean;
  @Input() public imageSaveSuccess: boolean;
  @Input() public imageUniqueName: string;
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
