import {Component, Input, Output, EventEmitter} from '@angular/core';
import * as  _ from 'lodash';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  private ratingValue: number = 0;
  @Output() private ratingChange = new EventEmitter;

  @Input() private scale: number = 5;
  @Input() private editable: boolean;

  constructor(
  ) {
  }

  @Input()
  get rating() {
    return this.ratingValue;
  }

  set rating(value) {
    this.ratingValue = value;
    this.ratingChange.emit(this.ratingValue);
  }

  private range(start, length) {
    return _.range(start, length + 1);
  }

  private selectValue(number) {
    if (this.editable) {
      this.rating = number;
    }
  }
}
