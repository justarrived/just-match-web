import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {Output} from '@angular/core';
import {nbrOfMonthsFromDate} from '../../../utils/date/date.util';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {yyyymmdd} from '../../../utils/date/date.util';
import {TranslateService} from '@ngx-translate/core';

function jobsFilterData(translations) {
  return [
    {
      name: 'All jobs',
      default: false,
      value: JSON.stringify({
        'filter[all]': true,
        'sort': 'open_for_applications,filled,-created_at',
      }).replace(/"/g, "'"),
      translatedText: {
        name: translations['input.filter.jobs.option.all']
      }
    },
    {
      name: 'Open for applications',
      default: true,
      value: JSON.stringify({
        'filter[open_for_applications]': true,
        'sort': '-created_at',
      }).replace(/"/g, "'"),
      translatedText: {
        name: translations['input.filter.jobs.option.open']
      }
    },
    {
      name: 'Filled jobs',
      default: false,
      value: JSON.stringify({
        'filter[filled]': true,
        'sort': '-created_at',
      }).replace(/"/g, "'"),
      translatedText: {
        name: translations['input.filter.jobs.option.filled']
      }
    },
    {
      name: 'Unfilled jobs',
      default: false,
      value: JSON.stringify({
        'filter[filled]': false,
        'filter[cancelled]': false,
        'sort': 'open_for_applications,-created_at'
      }).replace(/"/g, "'"),
      translatedText: {
        name: translations['input.filter.jobs.option.unfilled']
      }
    }
  ];
}

@Component({
  selector: 'filter-jobs-input',
  template: `
    <div class="ui form">
      <basic-loader
        [promise]="filterJobsOptions"
        class="inverted">
      </basic-loader>
      <select-dropdown-input
        [apiErrors]="apiErrors"
        [data]="filterJobsOptions | async"
        [control]="control"
        [paddingBottom]="0"
        [fluid]="false"
        [label]="'input.filter.jobs.label' | translate"
        [placeholder]="'input.filter.jobs.placeholder' | translate"
        dataItemLabelProperty="translatedText.name"
        dataItemValueProperty="value"
        selectedMemoryKey="filterJobsKey">
      </select-dropdown-input>
    </div>`
})
export class FilterJobsInputComponent extends BaseComponent {
  @Output() onFilterChanged: EventEmitter<any> = new EventEmitter<any>();

  public apiErrors: ApiErrors = new ApiErrors([]);
  public control: FormControl = new FormControl();
  public filterJobsOptions: Promise<any[]>;

  private controlValueChangesSubscription: Subscription;

  public constructor(
    private translateService: TranslateService,
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
      this.onFilterChanged.emit(JSON.parse(this.control.value.replace(/'/g, '"')));
    });
  }

  protected loadData() {
    this.translateService.get(['input.filter.jobs.option.all', 'input.filter.jobs.option.open', 'input.filter.jobs.option.filled', 'input.filter.jobs.option.unfilled']).subscribe((translations: any) => {
      this.filterJobsOptions = Promise.resolve(jobsFilterData(translations))
      .then(options => {
        if (!this.control.value && options.length > 0) {
          this.control.setValue(options.find((option) => option.default).value);
        }
        return options;
      });
    });
  }

  public onDestroy(): void {
    if (this.controlValueChangesSubscription) { this.controlValueChangesSubscription.unsubscribe(); }
  }
}
