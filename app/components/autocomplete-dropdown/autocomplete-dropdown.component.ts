import {Component, Input, ElementRef, OnInit, EventEmitter, Output} from "@angular/core";
import {cloneDeep, some, isEqual, isObject, assignIn, filter} from "lodash";
import {CountryProxy} from "../../services/proxy/country-proxy.service";
import {deleteElementFromArray} from "../../utils/array-util";

@Component({
  moduleId: module.id,
  selector: 'autocomplete-dropdown',
  templateUrl: 'autocomplete-dropdown.component.html',
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class AutocompleteDropdownComponent implements OnInit {
  @Input() destination: any;
  @Output() destinationChange = new EventEmitter();
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

  private UP_ARROW_KEY = 40;
  private DOWN_ARROW_KEY = 38;
  private ENTER_KEY = 13;

  private _searchQueryTimeoutId;
  private _isDefaultOptionSet: boolean = false;
  private _lastTextInput: string = '';
  private _firstItemIndex: number = this.hasAllOption ? -1 : 0;

  private _isGroupFunction: Function;

  wrapMode: boolean = false;

  isMultipleSelect: boolean;
  isDropdownOpened: boolean = false;
  autocompleteResults: any[] = [];

  selectedItemIndex: any = null;

  textInput: string = '';

  constructor(private _elementRef: ElementRef, private _countryProxy: CountryProxy) { }

  ngOnInit() {
    this.destinationChange.subscribe(() => {
      this._setTextInputFromDestination();
      this._setWrapMode();
    });

    this.isMultipleSelect = this.isArray && this.maxItems !== 1;

    if (this.isArray) {
      this.destination = this.destination || [];
      this.destinationChange.emit(this.destination);
      this._setWrapMode();
    }

    if (this.autoSelectFirstOption) {
      this._getLookupData();
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
      this._isGroupFunction = (item) => {
        return item && this.enumList[item] && this.enumList[item].isGroup;
      };
    }
  }

  onDeleteSelectedItem(item: any) {
    if (this.minItems && this.destination && this.minItems === this.destination.length) {
      return;
    }

    deleteElementFromArray(this.destination, item);
    this.destinationChange.emit(this.destination);
    this._setWrapMode();
  }

  onDropdownListItemSelect(item: any) {
    this.isDropdownOpened = false;
    this._setSelectedItem(item);
    this.selectedItemIndex = null;
  }

  // TODO: handle arrow buttons clicks

  // TODO: $scope.$watch('destination'

  // TODO: $scope.$watch('allOptionValue'

  onDownArrowClick() {
    // TODO: implement
  }

  onTextInputChange() {
    if (this.allowFreeText) {
      this._setSelectedItem(this.textInput);
    }

    // TODO: refactor to use RxJS extension methods
    clearTimeout(this._searchQueryTimeoutId);
    this._searchQueryTimeoutId = setTimeout(() => this._getLookupData(), 250);
  }

  allOptionLabelFunction() {
    return this.allOptionLabel || 'All';
  }

  private onDocumentClick(event) {
    if (!this._elementRef.nativeElement.contains(event.target) && this.isDropdownOpened) {
      this._setTextInputFromLast();
      this.isDropdownOpened = false;
    }
  }

  private _getLookupData() {
    switch (this.lookupType) {
      case 'enum':
        var filteredKeys = filter(Object.keys(this.enumList), key => {
          return this.enumList[key].isGroup ? this._shouldMatchGroup(key) : this._shouldMatch(key, this.enumList[key].name);
        });
        this._setLookupData(filteredKeys);
        break;

      case 'list':
        var filtered = filter(this.enumList, item => this._shouldMatch(item, item && item.toString()));
        this._setLookupData(filtered);
        break;

      default:
        if (this.getData) {
          this.getData(this.textInput, this._setLookupData);
        } else {
          // TODO: call function to get data
          this._countryProxy.getCountries(this.textInput).then(response => {
            this._setLookupData(response);
          });
          // clientLookupProxy.getLookupData(this.lookupPrefix + this.lookupType,
          //   {
          //     query: this.textInput,
          //     scope: this.queryScope,
          //     type: this.queryType,
          //     relation: this.queryRelation,
          //     companyId: this.queryCompanyId
          //   }
          // ).then(function(response) {
          //   this._setLookupData(response.value);
          // });
        }
        break;
    }
  }

  private _shouldMatchGroup(item) {
    if (!this.enumList[item].groupItems) {
      return false;
    }

    return some(this.enumList[item].groupItems, function(groupItem) {
      return this.enumList[groupItem] && this._shouldMatch(groupItem, this.enumList[groupItem].name);
    });
  }

  private _shouldMatch(item, simpleLabel) {
    let label: string = (this.autocompleteResultLabelFunction && this.autocompleteResultLabelFunction(item)) || simpleLabel;
    return !label || !this.textInput || label.toLowerCase().indexOf(this.textInput.toLowerCase()) > -1;
  }

  private _selectedItemLabelFunctionActual(item) {
    return (this.selectedItemLabelFunction && this.selectedItemLabelFunction(item)) || item;
  }

  private _setSelectedItem(item: any) {
    this._setDestination(item);
    this._setTextInputFromDestination();
  }

  private _setLookupData(data: any) {
    this.autocompleteResults = data;

    if (this._isDefaultOptionSet && this.autoSelectFirstOption) {
      this._isDefaultOptionSet = true;
      this._setSelectedItem(this.autocompleteResults[0]);
    } else {
      this.isDropdownOpened = true;
    }
  }

  private _setDestination(item: any) {
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

      this._setWrapMode();
    } else if (this.copyToDestination && isObject(itemActual)) {
      assignIn(this.destination, itemActual);
    } else {
      this.destination = cloneDeep(itemActual);
    }

    this.destinationChange.emit(this.destination);
  }

  private _setWrapMode() {
    this.wrapMode = this.destination && this.destination.length >= 1;
  }

  private _setTextInputFromDestination() {
    if (!this.destination) {
      this.textInput = '';
      this._saveLastTextInput();
      return;
    }

    if (this.hasAllOption && isEqual(this.destination, this.allOptionValue)) {
      this.textInput = this.allOptionLabelFunction();
      this._saveLastTextInput();
      return;
    }

    if (this.isArray) {
      if (this.maxItems === 1 && this.destination.length === 1) {
        this.textInput = this._selectedItemLabelFunctionActual(this.destination[0]);
      } else {
        this.textInput = '';
      }
    } else {
      this.textInput = this._selectedItemLabelFunctionActual(this.destination);
    }
    this._saveLastTextInput();
  }

  private _setTextInputFromLast() {
    if (!this.textInput) {
      this.textInput = cloneDeep(this._lastTextInput);
    }
  }

  private _clearTextInput() {
    this._saveLastTextInput();
    if (!this.allowFreeText) {
      this.textInput = '';
    }
  }

  private _saveLastTextInput() {
    this._lastTextInput = cloneDeep(this.textInput);
  }
}
