import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'sort-users-input',
  template: `
    <div class="ui form">
      <basic-loader
        [promise]="sortUsersOptions"
        class="inverted">
      </basic-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [data]="sortUsersOptions | async"
        [control]="control"
        [paddingBottom]="0"
        [fluid]="false"
        [label]="'input.sort.users.label' | translate"
        [placeholder]="'input.sort.users.placeholder' | translate"
        dataItemLabelProperty="translatedText.name"
        dataItemValueProperty="value">
      </select-dropdown-input>
    </div>`
})
export class SortUsersInputComponent extends BaseComponent {
  @Output() onSortChanged: EventEmitter<string> = new EventEmitter<string>();

  public apiErrors: ApiErrors = new ApiErrors([]);
  public control: FormControl = new FormControl();
  public sortUsersOptions: Promise<any[]>;

  private controlValueChangesSubscription: Subscription;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initControlValueChangesSubscription();
    this.loadData();
  }

  private initControlValueChangesSubscription(): void {
    this.controlValueChangesSubscription = this.control.valueChanges.subscribe(() => {
      this.onSortChanged.emit(this.control.value);
    });
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  protected loadData() {
    this.sortUsersOptions = Promise.resolve([
      {
        name: 'First Name (A-Z)',
        value: 'first_name',
        translatedText: {
          name: 'sort.users.input.option.first.name'
        }
      },
      {
        name: 'Last Name (A-Z)',
        value: 'last_name',
        translatedText: {
          name: 'sort.users.input.option.last.name'
        }
      },
      {
        name: 'First Name (Z-A)',
        value: '-first_name',
        translatedText: {
          name: 'sort.users.input.option.first.name.reverse'
        }
      },
      {
        name: 'Last Name (Z-A)',
        value: '-last_name',
        translatedText: {
          name: 'sort.users.input.option.last.name.reverse'
        }
      },
      {
        name: 'Oldest',
        value: 'created_at',
        translatedText: {
          name: 'sort.users.input.option.oldest'
        }
      },
      {
        name: 'Newest',
        value: '-created_at',
        translatedText: {
          name: 'sort.users.input.option.newest'
        }
      },
    ])
    .then(options => {
      if (options.length > 0) {
        this.control.setValue(options[0].value);
      }
      return options;
    });
  }

  public onDestroy(): void {
    if (this.controlValueChangesSubscription) { this.controlValueChangesSubscription.unsubscribe(); }
  }
}
