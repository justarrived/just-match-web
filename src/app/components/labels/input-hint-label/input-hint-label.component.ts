import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'input-hint-label',
  template: `
    <div
      *ngIf="hint"
      style="text-align: center">
      <div class="ui pointing blue {{pointingDirection}} label">
        {{hint}}
      </div>
    </div>`
})
export class InputHintLabelComponent {
  @Input() public hint: string;
  @Input() public pointingDirection: string; // Default to up. Should be one of below, right, left
}
