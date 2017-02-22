import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'autocomplete-dropdown-list-item',
  templateUrl: './autocomplete-dropdown-list-item.component.html'
})
export class AutocompleteDropdownListItemComponent implements OnInit {
  @Input() item: any;
  @Input() labelFunction: Function;
  @Input() isGroupFunction: Function;
  @Output() dropdownListItemSelect = new EventEmitter();
  @Input() translateLabel: boolean;

  label: string;
  isGroup: boolean;

  constructor(
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.label = (this.labelFunction && this.labelFunction(this.item)) || this.item;
    if (this.translateLabel) {
      this.label = this.translateService.instant(this.label);
    }
    this.isGroup = !!(this.isGroupFunction && this.isGroupFunction(this.item));
  }

  onItemSelect() {
    if (this.isGroup) {
      return;
    }
    this.dropdownListItemSelect.emit(this.item);
  }
}
