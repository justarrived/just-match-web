import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'input-error',
  template: `
    <div
      *ngIf="visible"
      class="ui pointing red basic label">
      {{label}}
    </div>`
})
export class InputErrorComponent {
  @Input() public label: string;
  @Input() public visible: boolean = true;

  public hideError(): void {
    this.visible = false;
  }

  public showError(): void {
    this.visible = true;
  }
}
