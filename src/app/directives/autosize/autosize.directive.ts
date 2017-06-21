import {BaseComponent} from '../../components/base.component';
import {Directive} from '@angular/core';
import {ElementRef} from '@angular/core';
import {HostListener} from '@angular/core';
import {Renderer2} from '@angular/core';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../resolvers/user/user.resolver';

@Directive({
  selector: 'textarea[autosize]'
})
export class AutosizeDirective extends BaseComponent {

  @HostListener('input', ['$event.target'])
  public onInput(textArea: any): void {
    this.adjust();
  }

  public constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }


  public afterContentChecked(): void {
    this.adjust();
  }

  public adjust(): void {
    this.renderer.setStyle(this.element.nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.element.nativeElement, 'height', 'auto');
    this.renderer.setStyle(this.element.nativeElement, 'height', this.element.nativeElement.scrollHeight + 'px');
  }
}
