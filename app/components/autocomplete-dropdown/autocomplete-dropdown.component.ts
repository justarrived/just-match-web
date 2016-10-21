import {Component, Input, ElementRef, ViewChild} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'autocomplete-dropdown',
  templateUrl: 'autocomplete-dropdown.component.html'
})
export class AutocompleteDropdownComponent {
  @Input() destination: '=';
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
  @Input() deleteConfirmation: boolean;
  @Input() copyToDestination: boolean;
  @Input() iconClass: string;
  @Input() getData: Function;

  isMultipleSelect: boolean;
  isDropdownOpened: boolean = false;
  autocompleteResults: any[] = [];

  selectedItemIndex: any = null;

  constructor(private elementRef: ElementRef) {
    this.isMultipleSelect = this.isArray && this.maxItems !== 1;

    console.log('elementRef', this.elementRef);
  }
}
