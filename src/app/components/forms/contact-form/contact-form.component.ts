import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {ContactProxy} from '../../../proxies/contact/contact.proxy';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Input} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {NavigationService} from '../../../services/navigation.service';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'contact-form',
  template: `
    <form
      (ngSubmit)="submitForm()"
      (keydown.enter)="$event.preventDefault()"
      [formGroup]="contactForm"
      class="ui form">
      <basic-loader
        [complete]="!loadingSubmit"
        class="inverted">
      </basic-loader>

      <name-input
        [control]="contactForm.controls['name']"
        [apiErrors]="apiErrors">
      </name-input>

      <email-input
        [control]="contactForm.controls['email']"
        [apiErrors]="apiErrors">
      </email-input>

      <contact-message-input
        [control]="contactForm.controls['body']"
        [apiErrors]="apiErrors">
      </contact-message-input>

      <form-submit-button
        [showButton]="!isInModal"
        [submitFail]="submitFail"
        [submitSuccess]="submitSuccess"
        [buttonText]="'contact.form.submit.button' | translate">
      </form-submit-button>
    </form>`
})
export class ContactFormComponent extends BaseComponent {
  @Input() public isInModal: boolean = false;

  public apiErrors: ApiErrors = new ApiErrors([]);
  public contactForm: FormGroup;
  public loadingSubmit: boolean;
  public submitFail: boolean;
  public submitSuccess: boolean;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private contactProxy: ContactProxy,
    private formBuilder: FormBuilder,
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

  public userChanged(user: User): void {
    this.initForm();
  }

  private initForm(): void {
    const name: string = this.user ? this.user.name : '';
    const email: string = this.user ? this.user.email : '';
    this.contactForm = this.formBuilder.group({
      'email': [email, Validators.compose([Validators.required, , Validators.email])],
      'body': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'name': [name, Validators.compose([Validators.required, Validators.minLength(2)])]
    });
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
      body: this.contactForm.value.body,
      email: this.contactForm.value.email,
      name: this.contactForm.value.name
    })
    .then(result => {
      this.submitSuccess = true;
      this.loadingSubmit = false;
      this.modalService.showModal('contactMessageSentModalComponent', false, false, this.isInModal ? 400 : 1);
      return result;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
      if (this.isInModal) {
        throw errors;
      }
      return null;
    });
  }
}
