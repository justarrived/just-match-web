import {Component, Input, ElementRef, OnInit, EventEmitter, Output, HostListener} from '@angular/core';
import {cloneDeep, some, isEqual, isObject, assignIn, filter} from 'lodash';
import {CountryProxy} from '../../services/proxy/country-proxy.service';
import {deleteElementFromArray} from '../../utils/array-util';
import Timer = NodeJS.Timer;
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'autocomplete-dropdown',
  templateUrl: './autocomplete-dropdown.component.html',
  styleUrls: ['./autocomplete-dropdown.component.scss']
})
export class AutocompleteDropdownComponent implements OnInit {
  @Input() destination: any;
  @Output() destinationChange = new EventEmitter();
  @Output() dropdownListItemSelect = new EventEmitter();
  @Input() clearDestinationAfterSelection: boolean;
  @Input() lookupType: string;
  @Input() lookupPrefix: string = 'client/lookup';
  @Input() queryScope: string;
  @Input() queryType: string;
  @Input() queryRelation: string;
  @Input() queryCompanyId: number;
  @Input() allowFreeText: boolean;
  @Input() placeholder: string;
  @Input() isArray: boolean;
  @Input() maxItems: number = Number.MAX_VALUE;
  @Input() minItems: number;
  @Input() autocompleteResultLabelFunction: Function;
  @Input() selectedItemLabelFunction: Function;
  @Input() autocompleteToSelectedItemFunction: Function;
  @Input() isDisabled: boolean;
  @Input() hasAllOption: boolean;
  @Input() allOptionValue: any;
  @Input() allOptionLabel: string;
  @Input() enumList: any;
  @Input() autoSelectFirstOption: boolean;
  @Input() copyToDestination: boolean;
  @Input() iconClass: string;
  @Input() getData: Function;
  @Input() touched: boolean = false;
  @Output() touchedChange = new EventEmitter();

  private searchQueryTimeoutId: Timer;
  private isDefaultOptionSet: boolean = false;
  private lastTextInput: string = '';
  private firstItemIndex: number = this.hasAllOption ? -1 : 0;

  private isGroupFunction: Function;

  wrapMode: boolean = false;

  isMultipleSelect: boolean;
  isDropdownOpened: boolean = false;
  autocompleteResults: any[] = [];

  selectedItemIndex: any = null;

  textInput: string = '';

  constructor(private elementRef: ElementRef, private countryProxy: CountryProxy) { }

  ngOnInit() {
    this.destinationChange.subscribe(() => {
      this.onDestinationChange();
    });

    if (this.autoSelectFirstOption) {
      setTimeout(() => this.getLookupData(), 0);
    }

    this.isMultipleSelect = this.isArray && this.maxItems !== 1;

    if (this.isArray) {
      this.destination = this.destination || [];
      this.destinationChange.emit(this.destination);
      this.setWrapMode();
    }

    if (this.lookupType === 'enum' && !this.autocompleteResultLabelFunction) {
      this.autocompleteResultLabelFunction = (item) => {
        return item && this.enumList[item] && this.enumList[item].name;
      };
    }
    if (this.lookupType === 'enum' && !this.selectedItemLabelFunction) {
      this.selectedItemLabelFunction = (item) => {
        return item && this.enumList[item] && this.enumList[item].name;
      };
    }
    if (this.lookupType === 'enum') {
      this.isGroupFunction = (item) => {
        return item && this.enumList[item] && this.enumList[item].isGroup;
      };
    }

    this.onDestinationChange();
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isDropdownOpened) {
      this.setTextInputFromLast();
      this.isDropdownOpened = false;
    }
  }

  onEnterClick() {
    if (this.allowFreeText && !this.selectedItemIndex) {
      this.isDropdownOpened = false;
      return;
    }
    let selectedItem = this.hasAllOption && this.selectedItemIndex === -1 ? this.allOptionValue : this.autocompleteResults[this.selectedItemIndex];
    this.onDropdownListItemSelect(selectedItem);
  }

  onArrowClick(isUp: boolean) {
    if (!this.isDropdownOpened) {
      this.onInputClick();
    }

    this.updateSelectedItemIndex(isUp);
  }

  onDeleteSelectedItem(item: any) {
    if (this.minItems && this.destination && this.minItems === this.destination.length) {
      return;
    }

    deleteElementFromArray(this.destination, item);
    this.destinationChange.emit(this.destination);
    this.setWrapMode();
  }

  onDropdownListItemSelect(item: any) {
    this.isDropdownOpened = false;
    this.setDestination(item);
    this.selectedItemIndex = null;

    this.dropdownListItemSelect.emit(item);
  }

  markTouched() {
    this.touched = true;
    this.touchedChange.emit(this.touched);
  }

  onInputClick() {
    if (this.isDisabled) {
      return;
    }

    this.markTouched();

    if (this.isDropdownOpened) {
      this.isDropdownOpened = false;
    } else {
      this.clearTextInput();
      this.getLookupData();
    }
  }

  onTextInputChange() {
    if (this.allowFreeText) {
      this.setDestination(this.textInput);
    }

    // TODO: refactor to use RxJS extension methods
    clearTimeout(this.searchQueryTimeoutId);
    this.searchQueryTimeoutId = setTimeout(() => this.getLookupData(), 250);
  }

  allOptionLabelFunction() {
    return this.allOptionLabel || 'All';
  }

  private onDestinationChange() {
    this.setTextInputFromDestination();
    this.setWrapMode();
  }

  private updateSelectedItemIndex(isUp: boolean) {
    this.selectedItemIndex = this.selectedItemIndex || 0;
    this.selectedItemIndex += isUp ? -1 : 1;

    this.selectedItemIndex = Math.max(Math.min(this.selectedItemIndex, this.autocompleteResults.length - 1), this.firstItemIndex);
  }

  private getLookupData() {
    switch (this.lookupType) {
      case 'enum':
        let filteredKeys = filter(Object.keys(this.enumList), key => {
          return this.enumList[key].isGroup ? this.shouldMatchGroup(key) : this.shouldMatch(key, this.enumList[key].name);
        });
        this.setLookupData(filteredKeys);
        break;

      case 'list':
        let filtered = filter(this.enumList, item => this.shouldMatch(item, item && item.toString()));
        this.setLookupData(filtered);
        break;

      default:
        if (this.getData) {
          this.getData(this.textInput).then(response => this.setLookupData(response));
        } else {
          // TODO: call function to get data
          this.countryProxy.getCountries(this.textInput).then(response => this.setLookupData(response));
        }
        break;
    }
  }

  private shouldMatchGroup(item: string) {
    if (!this.enumList[item].groupItems) {
      return false;
    }

    return some(this.enumList[item].groupItems, (groupItem: string) => {
      return this.enumList[groupItem] && this.shouldMatch(groupItem, this.enumList[groupItem].name);
    });
  }

  private shouldMatch(item, simpleLabel) {
    let label: string = (this.autocompleteResultLabelFunction && this.autocompleteResultLabelFunction(item)) || simpleLabel;
    return !label || !this.textInput || label.toLowerCase().indexOf(this.textInput.toLowerCase()) === 0;
  }

  private selectedItemLabelFunctionActual(item: any) {
    return (this.selectedItemLabelFunction && this.selectedItemLabelFunction(item)) || item;
  }

  private setLookupData(data: any) {
    this.autocompleteResults = data;

    if (!this.isDefaultOptionSet && this.autoSelectFirstOption) {
      this.isDefaultOptionSet = true;
      this.setDestination(this.autocompleteResults[0]);
    } else {
      this.isDropdownOpened = true;
    }
  }

  private setDestination(item: any) {
    if (this.clearDestinationAfterSelection) {
      this.destination = null;
      this.destinationChange.emit(this.destination);
      return;
    }

    if (item && this.allOptionValue === item) {
      this.destination = cloneDeep(item);
      this.destinationChange.emit(this.destination);
      return;
    }

    let itemActual = null;
    if (item) {
      itemActual = (this.autocompleteToSelectedItemFunction && this.autocompleteToSelectedItemFunction(item)) || item;
    }

    if (this.isArray) {
      if (this.maxItems === 1) {
        this.destination = itemActual ? [itemActual] : [];
      } else {
        let isDuplicate = some(this.destination, destinationItem => isEqual(destinationItem, itemActual));

        if (itemActual && !isDuplicate && this.destination.length < this.maxItems) {
          this.destination.push(itemActual);
        }
      }

      this.setWrapMode();
    } else if (this.copyToDestination && isObject(itemActual)) {
      assignIn(this.destination, itemActual);
    } else {
      this.destination = cloneDeep(itemActual);
    }

    // TODO: handle change properly
    this.destinationChange.emit(this.destination);
  }

  private setWrapMode() {
    this.wrapMode = this.destination && this.destination.length >= 1;
  }

  private setTextInputFromDestination() {
    if (!this.destination) {
      this.textInput = '';
      this.saveLastTextInput();
      return;
    }

    if (this.hasAllOption && isEqual(this.destination, this.allOptionValue)) {
      this.textInput = this.allOptionLabelFunction();
      this.saveLastTextInput();
      return;
    }

    if (this.isArray) {
      if (this.maxItems === 1 && this.destination.length === 1) {
        this.textInput = this.selectedItemLabelFunctionActual(this.destination[0]);
      } else {
        this.textInput = '';
      }
    } else {
      this.textInput = this.selectedItemLabelFunctionActual(this.destination);
    }
    this.saveLastTextInput();
  }

  private setTextInputFromLast() {
    if (!this.textInput) {
      this.textInput = cloneDeep(this.lastTextInput);
    }
  }

  private clearTextInput() {
    this.saveLastTextInput();
    if (!this.allowFreeText) {
      this.textInput = '';
    }
  }

  private saveLastTextInput() {
    this.lastTextInput = cloneDeep(this.textInput);
  }
}
