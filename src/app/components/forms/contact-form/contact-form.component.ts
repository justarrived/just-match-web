import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {ChangeDetectorRef} from '@angular/core';
import {Component} from '@angular/core';
import {ContactProxy} from '../../../proxies/contact/contact.proxy';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {JARoutes} from '../../../routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {Validators} from '@angular/forms';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit, OnDestroy {
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

  public submitForm(value: any): void {
    this.loadingSubmit = true;
    this.submitFail = false;
    this.submitSuccess = false;

    this.contactProxy.saveContactNotification({
      body: value.message,
      email: value.email,
      name: value.name
    })
    .then(result => {
      this.submitSuccess = true;
      this.navigationService.navigate(JARoutes.confirmation, 'contact-message-sent');
      this.loadingSubmit = false;
    })
    .catch(errors => {
      this.handleServerErrors(errors);
    });
  }
}
