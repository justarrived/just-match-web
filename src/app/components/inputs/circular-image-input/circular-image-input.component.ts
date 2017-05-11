import {Component} from '@angular/core';
import {ElementRef} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {Renderer} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'circular-image-input',
  styleUrls: ['./circular-image-input.component.scss'],
  template: `
    <div
      *ngIf="uploadingImage"
      class="ui large inverted active text loader">
      {{'component.loading' | translate}}
    </div>
    <img
      (click)="onImageClick()"
      [ngClass]="{'centered': centered, 'uploading': uploadingImage}"
      [src]="imageUrl || placeholderImageUrl || '/assets/images/image.png'"
      class="ui {{size}} circular bordered image">
    <input
      #fileInput
      (change)="onDocumentFilenameChange($event)"
      accept="image/jpeg,image/png"
      style="display: none"
      type="file"/>`
})
export class CircularImageInputComponent {
  @Input() public centered: boolean;
  @Input() public imageUrl: string;
  @Input() public placeholderImageUrl: string;
  @Input() public imageSaveFail: boolean;
  @Input() public imageSaveSuccess: boolean;
  @Input() public uploadingImage: boolean;
  @Input() public size: string = 'medium'; // One of ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', massive]
  @Output() public onFileSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild('fileInput') public fileInput: ElementRef;

  constructor(
    private renderer: Renderer
  ) {
  }

  public onImageClick() {
    if (this.uploadingImage) {
      return;
    }

    this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'click');
  }

  public onDocumentFilenameChange(event) {
    const file = event.srcElement.files[0];
    if (!file) {
      return;
    }

    this.onFileSelect.emit(file);
  }
}
