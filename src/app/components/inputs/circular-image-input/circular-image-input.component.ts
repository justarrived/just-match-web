import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {ElementRef} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {Renderer} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'circular-image-input',
  styleUrls: ['./circular-image-input.component.scss'],
  template: `
    <div
      *ngIf="uploadingImage"
      class="ui large inverted active text loader">
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
export class CircularImageInputComponent extends BaseComponent {
  @Input() public centered: boolean;
  @Input() public imageUrl: string;
  @Input() public placeholderImageUrl: string;
  @Input() public imageSaveFail: boolean;
  @Input() public imageSaveSuccess: boolean;
  @Input() public uploadingImage: boolean;
  @Input() public size: string = 'medium'; // One of ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', massive]
  @Output() public onFileSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild('fileInput') public fileInput: ElementRef;

  public constructor(
    private renderer: Renderer,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onImageClick() {
    if (this.uploadingImage) {
      return;
    }

    this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'click');
  }

  public onDocumentFilenameChange(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    this.onFileSelect.emit(file);
  }
}
