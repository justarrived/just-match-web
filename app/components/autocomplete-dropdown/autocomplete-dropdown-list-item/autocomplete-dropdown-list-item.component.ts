import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'autocomplete-dropdown-list-item',
  templateUrl: 'autocomplete-dropdown-list-item.component.html'
})
export class AutocompleteDropdownListItemComponent implements OnInit {
  @Input() item: any;
  @Input() labelFunction: Function;
  @Input() isGroupFunction: Function;
  @Output() dropdownListItemSelect = new EventEmitter();

  label: string;
  isGroup: boolean;

  ngOnInit() {
    this.label = (this.labelFunction && this.labelFunction(this.item)) || this.item;
    this.isGroup = !!(this.isGroupFunction && this.isGroupFunction(this.item));
  }

  onItemSelect() {
    if (this.isGroup) {
      return;
    }
    this.dropdownListItemSelect.emit(this.item);
  }
}
