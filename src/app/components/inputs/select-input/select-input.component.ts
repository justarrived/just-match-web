import {BaseComponent} from '../../base.component';
import {Component} from "@angular/core";
import {DataStoreService} from '../../../services/data-store.service';
import {ElementRef} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {Output} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "select-input",
  template: `
    <basic-text
      [text]="label"
      *ngIf="label"
      fontSize="small"
      fontWeight="bold"
      marginBottom="0"
      marginTop="0">
    </basic-text>
    <div
      class="ui-select-wrapper"
      style="width: 100%"
      [ngClass]="{'direction-rtl': systemLanguage.direction === 'rtl'}">
      <select
        [formControl]="control"
        class="ui {{class}} fluid dropdown"
        [attr.multiple]="multiple ? 'true' : null"
        #select>
        <option
          value="">
          {{placeholder}}
        </option>
        <ng-content></ng-content>
      </select>
    </div>`
})
export class SelectInputComponent extends BaseComponent {
  @Input() public class: string;
  @Input() public control: FormControl = new FormControl();
  @Input() public label: string;
  @Input() public multiple: boolean = false;
  @Input() public multipleResultControl: any;
  @Input() public options: {} = {};
  @Input() public placeholder: string;
  @Input() public selectedMemoryKey: string;
  @Input() public selectedPersistKey: string;
  @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("select") public select: ElementRef;

  public _data: any;

  @Input("data")
  public set data(data: any) {
    this._data = data;
    this.updateSelected();
  }

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private dataStoreService: DataStoreService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    let value = null;
    if (this.selectedMemoryKey) {
      value = this.dataStoreService.getFromMemory(this.selectedMemoryKey);
    } else if (this.selectedPersistKey) {
      value = this.dataStoreService.getCookie(this.selectedPersistKey);
    }

    if (value) {
      this.control.setValue(value);
      if (this.multipleResultControl) {
        this.multipleResultControl.setValue(value);
      }
    }
  }

  public afterViewInit(): void {
    const options: {} = Object.assign({
      sortSelect: true,
      forceSelection: false,
      allowReselection: true,
      onChange: (value) => {
        if (this.selectedMemoryKey) {
          this.dataStoreService.setInMemory(this.selectedMemoryKey, this.control.value);
        } else if (this.selectedPersistKey) {
          this.dataStoreService.setCookie(this.selectedPersistKey, this.control.value);
        }

        this.onChange.emit(value);
      },
      onAdd: (value) => {
        if (this.multipleResultControl) {
          if (!Array.isArray(this.multipleResultControl.value)) this.multipleResultControl.setValue([]);
          this.multipleResultControl.value.push(value);
        }
      },
      onRemove: (value) => {
        if (this.multipleResultControl) {
          if (!Array.isArray(this.multipleResultControl.value)) this.multipleResultControl.setValue([]);
          this.multipleResultControl.setValue(this.multipleResultControl.value.filter(item => item !== value));
        }
      },
      onHide: () => this.control.markAsTouched()
    }, this.options);

    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.select.nativeElement)
        .dropdown(options);
    }

    this.updateSelected();
  }

  private updateSelected() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this._data) return;
    if (!this.control.value) return;

    let values = this.control.value;

    if (!Array.isArray(values)) {
      values = [values]
    }

    values.forEach(value => {
      setTimeout(() => {
        jQuery(this.select.nativeElement).dropdown("set selected", value);
      }, 1);
    })
  }
}
