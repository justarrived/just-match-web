import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {JARoute} from '../../../routes/ja-route/ja-route';
import {JobDigest} from '../../../models/api-models/job-digest/job-digest';
import {JobDigestProxy} from '../../../proxies/job-digest/job-digest.proxy';
import {ModalService} from '../../../services/modal.service';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';


@Component({
  selector: 'subscribe-form',
  styleUrls: ['./subscribe-form.component.scss'],
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
        [apiErrors]="apiErrors">
      </primary-occupations-input>

      <city-autocomplete-input
        [apiErrors]="apiErrors"
        [control]="form.controls['address']"
        [cityControl]="form.controls['city']"
        [countryCodeControl]="form.controls['country_code']"
        [hint]="!jobDigest && 'subscribe.form.city.hint' | translate"
        [stateControl]="form.controls['state']"
        [latitudeControl]="form.controls['latitude']"
        [longitudeControl]="form.controls['longitude']">
      </city-autocomplete-input>

      <form-submit-button
        [buttonText]="'subscribe.form.submit.button' | translate"
        [showButton]="!isInModal && !jobDigest"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess">
      </form-submit-button>

      <base-button
        (click)="deleteJobDigest()"
        *ngIf="jobDigest"
        kind="secondary"
        [buttonText]="'subscribe.form.delete.button' | translate"
        size="small">
      </base-button>

      <base-button
        (click)="updateJobDigest()"
        *ngIf="jobDigest"
        kind="primary"
        [buttonText]="'subscribe.form.update.button' | translate"
        size="small"
        style="margin-left: 30px;">
      </base-button>
    </form>`
})
export class SubscribeFormComponent extends BaseComponent {
  @Input() public isInModal: boolean = false;
  @Input() public jobDigest = null as JobDigest;
  @Output() public digestCreated: EventEmitter<JobDigest> = new EventEmitter<JobDigest>();
  @Output() public digestDeleted: EventEmitter<JobDigest> = new EventEmitter<JobDigest>();
  @Output() public digestUpdated: EventEmitter<JobDigest> = new EventEmitter<JobDigest>();

  public apiErrors: ApiErrors = new ApiErrors([]);
  public loadingSubmit: boolean;
  public form: FormGroup;
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
    this.initForm();
  }

  private initForm(): void {
    if (this.jobDigest) {
      this.form = this.formBuilder.group({
        'address': [this.jobDigest.address.city ? this.jobDigest.address.city + ', Sverige' : ''],
        'city': [this.jobDigest.address.city],
        'country_code': [this.jobDigest.address.countryCode],
        'email': [this.user && this.user.email, Validators.compose([Validators.required])],
        'latitude': [this.jobDigest.address.latitude],
        'longitude': [this.jobDigest.address.longitude],
        'notification_frequency': [this.jobDigest.notificationFrequency],
        'occupation_ids': [''],
        'state': [this.jobDigest.address.state],
        'subscriber_error': [''],
      });
    } else {
      this.form = this.formBuilder.group({
        'address': [''],
        'city': [''],
        'country_code': [''],
        'email': [this.user && this.user.email, Validators.compose([Validators.required])],
        'latitude': [''],
        'longitude': [''],
        'notification_frequency': ['weekly'],
        'occupation_ids': [''],
        'state': [''],
        'subscriber_error': [''],
      });
    }
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

    return this.jobDigestProxy.createJobDigest({
      city: this.form.value.city,
      notification_frequency: this.form.value.notification_frequency,
      occupation_ids: occupationIds,
      state: this.form.value.state,
      country_code: this.form.value.country_code,
      latitude: this.form.value.latitude,
      longitude: this.form.value.longitude,
      user_id: this.user ? this.user.id : '',
      email: this.form.value.email,
    }, {
      'include': 'address,subscriber'
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

    return this.jobDigestProxy.updateJobDigest(this.jobDigest.subscriber.uuid, this.jobDigest.id, {
      city: this.form.value.city,
      notification_frequency: this.form.value.notification_frequency,
      occupation_ids: occupationIds,
      state: this.form.value.state,
      country_code: this.form.value.country_code,
      latitude: this.form.value.latitude,
      longitude: this.form.value.longitude
    }, {
      'include': 'address,subscriber'
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
