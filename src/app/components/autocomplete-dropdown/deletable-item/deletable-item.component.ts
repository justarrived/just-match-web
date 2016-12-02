import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'deletable-item',
  templateUrl: './deletable-item.component.html'
})
export class DeletableItemComponent implements OnChanges {
  @Input() item: any;
  @Input() labelFunction: Function;
  @Input() isDisabled: boolean;
  @Output() deleteSelectedItem = new EventEmitter();

  label: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLabel();
  }

  onDeleteButtonClick() {
    if (this.isDisabled) {
      return;
    }

    this.deleteSelectedItem.emit(this.item);
  }

  private updateLabel() {
    this.label = (this.labelFunction && this.labelFunction(this.item)) || this.item;
  }
}
