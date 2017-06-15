import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Output} from '@angular/core';

@Component({
  selector: 'language-proficiency-input',
  template: `
    <div style="margin-bottom: 10px; display: flex; align-items: center; flex-wrap: wrap;">
      <rating-input
        (onRate)="onRating($event)"
        [initialRating]="initialRating"
        [maxRating]="5"
        type="star"
        style="padding-top: 5px; padding-right: 5px;">
      </rating-input>
      <div class="ui tag pink label">
        <basic-text
          [text]="label"
          color="white"
          display="inline"
          fontSize="small"
          fontWeight="bold">
        </basic-text>
        <i
          class="delete icon"
          (click)="onDeleteIconClick()">
        </i>
      </div>
    </div>`
})
export class LanguageProficiencyInputComponent {
  @Input() public initialRating: number;
  @Input() public label: string;
  @Output() public onDelete = new EventEmitter();
  @Output() public onRate = new EventEmitter();

  public onRating(value) {
    this.onRate.emit(value);
  }

  public onDeleteIconClick() {
    this.onDelete.emit();
  }
}
