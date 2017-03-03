import {Component, Input} from '@angular/core';

@Component({
  selector: 'input-error',
  template: `<div *ngIf="visible" class="ui pointing red basic label">{{label}}</div>`
})
export class InputErrorComponent {
  @Input() label: string;
  @Input() visible: boolean = true;

  hideError(): void {
    this.visible = false;
  }

  showError(): void {
    this.visible = true;
  }
}
