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
  selector: 'filter-users-input',
  template: `
    <div class="ui form">
      <basic-loader
        [promise]="filterUsersOptions"
        class="inverted">
      </basic-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [data]="filterUsersOptions | async"
        [control]="control"
        [paddingBottom]="0"
        [fluid]="false"
        [label]="'input.filter.users.label' | translate"
        [placeholder]="'input.filter.users.placeholder' | translate"
        dataItemLabelProoerty="translatedText.name"
        dataItemValueProoerty="value">
      </select-dropdown-input>
    </div>`
})
export class FilterUsersInputComponent extends BaseComponent {
  @Output() onFilterChanged: EventEmitter<string> = new EventEmitter<string>();

  public apiErrors: ApiErrors = new ApiErrors([]);
  public control: FormControl = new FormControl();
  public filterUsersOptions: Promise<any[]>;

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

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private initControlValueChangesSubscription(): void {
    this.controlValueChangesSubscription = this.control.valueChanges.subscribe(() => {
      this.onFilterChanged.emit(this.control.value);
    });
  }

  protected loadData() {
    this.filterUsersOptions = Promise.resolve([
      {
        name: 'First Name',
        value: 'filter[first_name]',
        translatedText: {
          name: 'First Name'
        }
      },
      {
        name: 'Last Name',
        value: 'filter[last_name]',
        translatedText: {
          name: 'Last Name'
        }
      },
      {
        name: 'Id',
        value: 'filter[id]',
        translatedText: {
          name: 'Id'
        }
      },
      {
        name: 'Email',
        value: 'filter[email]',
        translatedText: {
          name: 'Email'
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
