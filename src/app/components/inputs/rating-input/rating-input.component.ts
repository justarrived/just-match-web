import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';

@Component({
  selector: 'rating-input',
  template: `
    <sm-rating
      class="{{size}} {{type}}"
      (onRate)="onRating($event)"
      [initialRating]="initialRating"
      [maxRating]="maxRating">
    </sm-rating>`
})
export class RatingInputComponent {
  @Input() public initialRating: number;
  @Input() public maxRating: number;
  @Input() public size: string = '';
  @Input() public type: string = 'star';
  @Output() public onRate = new EventEmitter();

  onRating(value) {
    this.onRate.emit(value);
  }
}
