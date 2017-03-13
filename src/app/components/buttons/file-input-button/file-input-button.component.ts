import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {ElementRef} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {Renderer} from '@angular/core';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'file-input-button',
  template: `
    <base-button
      (click)=onButtonClick()
      [buttonText]="buttonText"
      [fluid]="fluid"
      [icon]="icon"
      [kind]="kind"
      [size]="size"
      buttonType="button">
    </base-button>
    <input
      #fileInput
      (change)="onDocumentFilenameChange($event)"
      [accept]="accept"
      style="display: none"
      type="file"/>`
})
export class FileInputButtonComponent {
  @Input() accept: string;
  @Input() buttonText: string;
  @Input() fluid: boolean;
  @Input() icon: string;
  @Input() kind: string = 'primary'; // One of ['primary', 'primary-light', 'secondary', 'secondary-light', 'inactive-light', 'inactive-dark']
  @Input() size: string = 'medium'; // One of ['xsmall', 'small', 'medium', 'large']
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private rendered: Renderer
  ) {
  }

  public onButtonClick() {
    this.rendered.invokeElementMethod(this.fileInput.nativeElement, 'click');
  }

  public onDocumentFilenameChange(event) {
    this.onChange.emit(event);
  }
}
