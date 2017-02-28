import {Component, Input} from '@angular/core';

@Component({
  selector: 'input-error',
  template: `<div *ngIf="showErrorLabel" class="ui pointing red basic label">{{label}}</div>`
})
export class InputErrorComponent {
  @Input() label: string;
  showErrorLabel: boolean = true;

  hideError(): void {
    this.showErrorLabel = false;
  }

  showError(): void {
    this.showErrorLabel = true;
  }
}
