import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'sort-users-input',
  template: `
    <div class="ui form">
      <sm-loader
        [promise]="sortUsersOptions"
        class="inverted">
      </sm-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [data]="sortUsersOptions | async"
        [control]="control"
        [paddingBottom]="0"
        [fluid]="false"
        [label]="'input.sort.users.label' | translate"
        [placeholder]="'input.sort.users.placeholder' | translate"
        dataItemLabelProoerty="translatedText.name"
        dataItemValueProoerty="value">
      </select-dropdown-input>
    </div>`
})
export class SortUsersInputComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  @Output() onSortChanged: EventEmitter<string> = new EventEmitter<string>();

  public apiErrors: ApiErrors = new ApiErrors([]);
  public control: FormControl = new FormControl();
  public sortUsersOptions: Promise<any[]>;

  private controlValueChangesSubscription: Subscription;

  constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.initControlValueChangesSubscription();
    this.loadData();
  }

  private initControlValueChangesSubscription(): void {
    this.controlValueChangesSubscription = this.control.valueChanges.subscribe(() => {
      this.onSortChanged.emit(this.control.value);
    });
  }

  protected loadData() {
    this.sortUsersOptions = Promise.resolve([
      {
        name: 'First Name (A-Z)',
        value: 'first_name',
        translatedText: {
          name: 'First Name (A-Z)'
        }
      },
      {
        name: 'Last Name (A-Z)',
        value: 'last_name',
        translatedText: {
          name: 'Last Name (A-Z)'
        }
      },
      {
        name: 'First Name (Z-A)',
        value: '-first_name',
        translatedText: {
          name: 'First Name (Z-A)'
        }
      },
      {
        name: 'Last Name (Z-A)',
        value: '-last_name',
        translatedText: {
          name: 'Last Name (Z-A)'
        }
      },
      {
        name: 'Oldest',
        value: 'created_at',
        translatedText: {
          name: 'Oldest'
        }
      },
      {
        name: 'Newest',
        value: '-created_at',
        translatedText: {
          name: 'Newest'
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

  public ngOnDestroy(): void {
    if (this.controlValueChangesSubscription) { this.controlValueChangesSubscription.unsubscribe(); }
  }
}
