import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as  _ from "lodash";

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  ratingValue: number = 0;
  @Output() ratingChange = new EventEmitter;

  @Input() scale: number = 5;
  @Input() editable: boolean;

  constructor() {
  }

  @Input()
  get rating() {
    return this.ratingValue;
  }

  set rating(value) {
    this.ratingValue = value;
    this.ratingChange.emit(this.ratingValue);
  }

  range(start, length) {
    return _.range(start, length + 1);
  }

  selectValue(number) {
    if (this.editable) {
      this.rating = number;
    }
  }
}
