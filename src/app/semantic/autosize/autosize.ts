import {AfterContentChecked} from '@angular/core';
import {Directive} from '@angular/core';
import {ElementRef} from '@angular/core';
import {HostListener} from '@angular/core';

@Directive({
  selector: 'textarea[autosize]'
})
export class SMAutosizeDirective implements AfterContentChecked {

  @HostListener('input', ['$event.target'])
  public onInput(textArea: any): void {
    this.adjust();
  }

  public constructor(
    public element: ElementRef)
  {
  }

  public ngAfterContentChecked(): void {
    this.adjust();
  }

  public adjust(): void {
    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
  }
}
