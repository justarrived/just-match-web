import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
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
  @Input() public accept: string;
  @Input() public buttonText: string;
  @Input() public fluid: boolean;
  @Input() public icon: string;
  @Input() public kind: string = 'primary'; // One of ['primary', 'primary-light', 'secondary', 'secondary-light', 'inactive-light', 'inactive-dark']
  @Input() public size: string = 'medium'; // One of ['xsmall', 'small', 'medium', 'large']
  @Output() public onChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fileInput') public fileInput: ElementRef;

  constructor(
    private renderer: Renderer
  ) {
  }

  public onButtonClick() {
    this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'click');
  }

  public onDocumentFilenameChange(event) {
    this.onChange.emit(event);
  }
}
