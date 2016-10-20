import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'autocomplete-dropdown-list-item',
  templateUrl: 'autocomplete-dropdown-list-item.component.html'
})
export class AutocompleteDropdownListItemComponent {
  @Input() item: any;
  @Input() labelFunction: Function;
  @Input() isGroupFunction: Function;
  @Output() dropdownListItemSelect = new EventEmitter();

  label: string = (this.labelFunction && this.labelFunction(this.item)) || this.item;
  isGroup: boolean = !!(this.isGroupFunction && this.isGroupFunction(this.item));

  onItemSelect() {
    if (this.isGroup) {
      return;
    }
    this.dropdownListItemSelect.emit(this.item);
  }
}
