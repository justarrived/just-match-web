import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {ContactMessageSentModalComponent} from '../../modals/contact-message-sent-modal/contact-message-sent-modal.component';
import {ContactProxy} from '../../../proxies/contact/contact.proxy';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'contact-form',
  template: `
    <form
      (ngSubmit)="submitForm()"
      [formGroup]="contactForm"
      class="ui form">
      <sm-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </sm-loader>

      <contact-message-sent-modal
        #contactMessageSentModal>
      </contact-message-sent-modal>

      <name-input
        [control]="contactForm.controls['name']"
        [apiErrors]="apiErrors">
      </name-input>

      <email-input
        [control]="contactForm.controls['email']"
        [apiErrors]="apiErrors">
      </email-input>

      <message-input
        [control]="contactForm.controls['message']"
        [apiErrors]="apiErrors">
      </message-input>

      <form-submit-button
        [showButton]="showSubmitButton"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'contact.form.submit.button' | translate">
      </form-submit-button>
    </form>`
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input() public showSubmitButton: boolean = true;
  @ViewChild('contactMessageSentModal') public contactMessageSentModal: ContactMessageSentModalComponent;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public contactForm: FormGroup;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;
  public user: User;
  private userSubscription: Subscription;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private contactProxy: ContactProxy,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userResolver: UserResolver
  ) {
  }

  public ngOnInit(): void {
    this.initUser();
    this.initForm();
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
      this.initForm();
    });
  }

  private initForm(): void {
    const name: string = this.user ? this.user.name : '';
    const email: string = this.user ? this.user.email : '';
    this.contactForm = this.formBuilder.group({
      'email': [email, Validators.compose([Validators.required, Validators.minLength(6)])],
      'message': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'name': [name, Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private handleServerErrors(errors): void {
    this.submitFail = true;
    this.apiErrors = errors;
    this.loadingSubmit = false;
    this.changeDetector.detectChanges();
  }

  public submitForm(): Promise<any> {
    this.loadingSubmit = true;
    this.submitFail = false;
    this.submitSuccess = false;

    return this.contactProxy.createContactNotification({
      body: this.contactForm.value.message,
      email: this.contactForm.value.email,
      name: this.contactForm.value.name
    })
    .then(result => {
      this.submitSuccess = true;
      this.loadingSubmit = false;
      this.contactMessageSentModal.show();
      return result;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      throw errors;
    });
  }
}
