import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {BaseComponent} from '../../base.component';
import {Component} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: "search-input",
  template: `
    <div class="field">
      <basic-text
        [text]="label"
        *ngIf="label"
        fontSize="small"
        fontWeight="bold"
        marginBottom="0"
        marginTop="0">
      </basic-text>
      <div
        [ngClass]="{'loading': loading}"
        class="ui search">
        <div
          class="ui input "
          [ngClass]="{'left': icon && systemLanguage.direction === 'ltr', 'right': icon && systemLanguage.direction === 'rtl', 'icon': icon}">
          <input
            [attr.placeholder]="placeholder"
            [class.arabic-font]="systemLanguage.direction === 'rtl'"
            [formControl]="searchControl"
            [style.direction]="systemLanguage.direction"
            [style.text-align]="systemLanguage.direction === 'ltr' ? 'left' : 'right'"
            class="prompt"
            type="text">
          <i
            *ngIf="icon"
            class="search icon">
          </i>
        </div>
        <div class="results"></div>
      </div>
    </div>`
})
export class SearchInputComponent extends BaseComponent {
  @Input() public icon: boolean;
  @Input() public label: string;
  @Input() public loading: boolean;
  @Input() public placeholder: string;
  @Input() public searchFrequency: number = 0;
  @Output() public onSearch: EventEmitter<string> = new EventEmitter<string>();

  public searchControl: FormControl = new FormControl();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public afterViewInit(): void {
    this.searchControl
      .valueChanges
      .distinctUntilChanged()
      .debounceTime(this.searchFrequency)
      .subscribe((data: string) => this.onSearch.emit(data));
  }
}
