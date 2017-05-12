import {AfterContentChecked} from '@angular/core';
import {Directive} from '@angular/core';
import {ElementRef} from '@angular/core';
import {HostListener} from '@angular/core';
import {Renderer2} from '@angular/core';

@Directive({
  selector: 'textarea[autosize]'
})
export class SMAutosizeDirective implements AfterContentChecked {

  @HostListener('input', ['$event.target'])
  public onInput(textArea: any): void {
    this.adjust();
  }

  public constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  public ngAfterContentChecked(): void {
    this.adjust();
  }

  public adjust(): void {
    this.renderer.setStyle(this.element.nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.element.nativeElement, 'height', 'auto');
    this.renderer.setStyle(this.element.nativeElement, 'height', this.element.nativeElement.scrollHeight + 'px');
  }
}
