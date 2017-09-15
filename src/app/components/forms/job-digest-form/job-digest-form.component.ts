import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {JobDigest} from '../../../models/api-models/job-digest/job-digest';
import {JobDigestProxy} from '../../../proxies/job-digest/job-digest.proxy';
import {ModalService} from '../../../services/modal.service';
import {NavigationService} from '../../../services/navigation.service';
import {Output} from '@angular/core';
import {range} from 'lodash';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';


@Component({
  selector: 'job-digest-form',
  styleUrls: ['./job-digest-form.component.scss'],
  template: `
    <form
      (ngSubmit)="submitForm()"
      [formGroup]="form"
      class="ui form"
      (keydown.enter)="$event.preventDefault()">
      <basic-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </basic-loader>

      <email-input
        *ngIf="!user && !jobDigest"
        [control]="form.controls['email']"
        [apiErrors]="apiErrors">
      </email-input>

      <input-errors
        apiAttribute="subscriber"
        [apiErrors]="apiErrors"
        [control]="form.controls['subscriber_error']">
      </input-errors>

      <job-digest-notification-frequency-input
        [control]="form.controls['notification_frequency']"
        [apiErrors]="apiErrors">
      </job-digest-notification-frequency-input>

      <primary-occupations-input
        [control]="form.controls['occupation_ids']"
        [apiErrors]="apiErrors"
        [resultObject]="occupationsResultObject">
      </primary-occupations-input>

      <div
        *ngFor="let i of range(1, numberOfVisibleAddressFields + 1)"
        style="display: flex; flex-wrap: wrap; align-items: center;">
        <div style="flex: 1;">
          <city-autocomplete-input
            [apiErrors]="apiErrors"
            [control]="form.controls['address' + i]"
            [cityControl]="form.controls['city' + i]"
            [countryCodeControl]="form.controls['country_code' + i]"
            [stateControl]="form.controls['state' + i]"
            [latitudeControl]="form.controls['latitude' + i]"
            [longitudeControl]="form.controls['longitude' + i]"
            [showLabel]="i === 1">
          </city-autocomplete-input>
        </div>

        <i
          style="cursor: pointer;"
          (click)="removeAddressField(i)"
          class="red large minus icon">
        </i>
      </div>

      <basic-title-text
        style="cursor: pointer;"
        (click)="addAddressField()"
        color="gray"
        marginTop="0"
        marginBottom="0"
        iconLeft="green large plus icon"
        *ngIf="numberOfVisibleAddressFields < maxNumberOfAddresses"
       [text]="'Add city' | translate">
      </basic-title-text>

      <basic-text
        *ngIf="numberOfVisibleAddressFields === maxNumberOfAddresses"
       [text]="'job.digest.form.max.cities' | translate">
      </basic-text>

      <input-hint-label [hint]="!jobDigest && 'job.digest.form.city.hint' | translate"></input-hint-label>

      <form-submit-button
        [buttonText]="'job.digest.form.submit.button' | translate"
        [showButton]="!isInModal && !jobDigest"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess">
      </form-submit-button>

      <base-action-button
        (click)="deleteJobDigest()"
        *ngIf="jobDigest"
        kind="secondary"
        [buttonText]="'job.digest.form.delete.button' | translate"
        size="small">
      </base-action-button>

      <base-action-button
        (click)="updateJobDigest()"
        *ngIf="jobDigest"
        kind="primary"
        [buttonText]="'job.digest.form.update.button' | translate"
        size="small"
        style="margin-left: 30px;">
      </base-action-button>
    </form>`
})
export class JobDigestFormComponent extends BaseComponent {
  @Input() public isInModal: boolean = false;
  @Input() public jobDigest = null as JobDigest;
  @Output() public digestCreated: EventEmitter<JobDigest> = new EventEmitter<JobDigest>();
  @Output() public digestDeleted: EventEmitter<JobDigest> = new EventEmitter<JobDigest>();
  @Output() public digestUpdated: EventEmitter<JobDigest> = new EventEmitter<JobDigest>();

  private numberOfVisibleAddressFields: number;
  private readonly maxNumberOfAddresses: number = 10;
  public apiErrors: ApiErrors = new ApiErrors([]);
  public Array = Array;
  public form: FormGroup;
  public loadingSubmit: boolean;
  public occupationsResultObject: any = {};
  public range = range;
  public submitFail: boolean;
  public submitSuccess: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private jobDigestProxy: JobDigestProxy,
    private modalService: ModalService,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initOccupationsResultObject();
    this.initForm();
    this.initNumberOfVisibleAddressFields();
  }

  private initForm(): void {
    if (this.jobDigest) {

      let formBuildObject = {
        'email': [this.user && this.user.email, Validators.compose([Validators.required])],
        'notification_frequency': [this.jobDigest.notificationFrequency],
        'occupation_ids': [this.occupationsResultObject],
        'subscriber_error': [''],
      };

      for (let i = 1; i <= this.maxNumberOfAddresses; i++) {
        let address = this.jobDigest.addresses[i - 1];
        if (address) {
          formBuildObject['address' + i] = [address.city ? address.city + ', Sverige' : ''];
          formBuildObject['city' + i] = [address.city];
          formBuildObject['country_code' + i] = [address.countryCode];
          formBuildObject['latitude' + i] = [address.latitude];
          formBuildObject['longitude' + i] = [address.longitude];
          formBuildObject['state' + i] = [address.state];
        } else {
          formBuildObject['address' + i] = [''];
          formBuildObject['city' + i] = [''];
          formBuildObject['country_code' + i] = [''];
          formBuildObject['latitude' + i] = [''];
          formBuildObject['longitude' + i] = [''];
          formBuildObject['state' + i] = [''];
        }
      }

      console.log(formBuildObject);

      this.form = this.formBuilder.group(formBuildObject);

    } else {

      let formBuildObject = {
        'email': [this.user && this.user.email, Validators.compose([Validators.required])],
        'notification_frequency': ['weekly'],
        'occupation_ids': [''],
        'subscriber_error': [''],
      };

      for (let i = 1; i <= this.maxNumberOfAddresses; i++) {
        formBuildObject['address' + i] = [''];
        formBuildObject['city' + i] = [''];
        formBuildObject['country_code' + i] = [''];
        formBuildObject['latitude' + i] = [''];
        formBuildObject['longitude' + i] = [''];
        formBuildObject['state' + i] = [''];
      }

      this.form = this.formBuilder.group(formBuildObject);

    }
  }

  private initOccupationsResultObject(): void {
    this.occupationsResultObject = {};
    if (this.jobDigest) {
      for (let occupation of this.jobDigest.occupations) {
        this.occupationsResultObject[occupation.id] = true;
      }
    }
  }

  private initNumberOfVisibleAddressFields(): void {
    this.numberOfVisibleAddressFields = this.jobDigest && this.jobDigest.addresses.length || 1;
  }

  public addAddressField(): void {
    this.numberOfVisibleAddressFields++;
  }

  public removeAddressField(i: number) {
    for (let j = i; j < this.numberOfVisibleAddressFields; j++) {
      this.form.controls['address' + j].setValue(this.form.value['address' + (j + 1)]);
      this.form.controls['city' + j].setValue(this.form.value['city' + (j + 1)]);
      this.form.controls['country_code' + j].setValue(this.form.value['country_code' + (j + 1)]);
      this.form.controls['latitude' + j].setValue(this.form.value['latitude' + (j + 1)]);
      this.form.controls['longitude' + j].setValue(this.form.value['longitude' + (j + 1)]);
      this.form.controls['state' + j].setValue(this.form.value['state' + (j + 1)]);
    }

    this.form.controls['address' + this.numberOfVisibleAddressFields].setValue('');
    this.form.controls['city' + this.numberOfVisibleAddressFields].setValue('');
    this.form.controls['country_code' + this.numberOfVisibleAddressFields].setValue('');
    this.form.controls['latitude' + this.numberOfVisibleAddressFields].setValue('');
    this.form.controls['longitude' + this.numberOfVisibleAddressFields].setValue('');
    this.form.controls['state' + this.numberOfVisibleAddressFields].setValue('');

    this.numberOfVisibleAddressFields--;
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<JobDigest> {
    this.submitFail = false;
    this.submitSuccess = false;
    this.loadingSubmit = true;

    let occupationIds = [];
    for (let occupationId in this.form.value.occupation_ids) {
      if (this.form.value.occupation_ids[occupationId]) {
        occupationIds.push({id: occupationId});
      }
    }

    let addresses = [];

    for (let i = 1; i <= this.numberOfVisibleAddressFields; i++) {
      addresses.push({
        city: this.form.value['city' + i],
        state: this.form.value['state' + i],
        country_code: this.form.value['country_code' + i],
        latitude: this.form.value['latitude' + i],
        longitude: this.form.value['longitude' + i],
      });
    }

    return this.jobDigestProxy.createJobDigest({
      addresses: addresses,
      notification_frequency: this.form.value.notification_frequency,
      occupation_ids: occupationIds,
      user_id: this.user ? this.user.id : '',
      email: this.form.value.email,
    }, {
      'include': 'addresses,subscriber,occupations'
    })
    .then(jobDigest => {
      this.loadingSubmit = false;
      this.submitSuccess = true;
      this.modalService.showModal('subscribedModalComponent', false, false, this.isInModal ? 400 : 1);
      this.digestCreated.emit(jobDigest);
      return jobDigest;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      if (this.isInModal) {
        throw errors;
      }
    });
  }

  public deleteJobDigest(): Promise<any> {
    this.submitFail = false;
    this.submitSuccess = false;
    this.loadingSubmit = true;

    return this.jobDigestProxy.removeJobDigest(this.jobDigest.subscriber.uuid, this.jobDigest.id)
    .then(result => {
      this.loadingSubmit = false;
      this.submitSuccess = true;
      this.digestDeleted.emit(this.jobDigest);
      return result;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      if (this.isInModal) {
        throw errors;
      }
    });
  }

  public updateJobDigest(): Promise<JobDigest> {
    this.submitFail = false;
    this.submitSuccess = false;
    this.loadingSubmit = true;

    let occupationIds = [];
    for (let occupationId in this.form.value.occupation_ids) {
      if (this.form.value.occupation_ids[occupationId]) {
        occupationIds.push({id: occupationId});
      }
    }

    let addresses = [];

    for (let i = 1; i <= this.numberOfVisibleAddressFields; i++) {
      addresses.push({
        city: this.form.value['city' + i],
        state: this.form.value['state' + i],
        country_code: this.form.value['country_code' + i],
        latitude: this.form.value['latitude' + i],
        longitude: this.form.value['longitude' + i],
      });
    }

    return this.jobDigestProxy.updateJobDigest(this.jobDigest.subscriber.uuid, this.jobDigest.id, {
      addresses: addresses,
      notification_frequency: this.form.value.notification_frequency,
      occupation_ids: occupationIds,
    }, {
      'include': 'addresses,subscriber,occupations'
    })
    .then(jobDigest => {
      this.loadingSubmit = false;
      this.submitSuccess = true;
      this.digestUpdated.emit(this.jobDigest);
      return jobDigest;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      if (this.isInModal) {
        throw errors;
      }
    });
  }
}
