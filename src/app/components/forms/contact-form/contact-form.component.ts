import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {ContactNotification} from '../../../models/contact-notification';
import {ContactProxy} from '../../../services/proxy/contact-proxy.service';
import {FormBuilder} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {JARoutes} from '../../../routes/ja-routes';
import {NavigationService} from '../../../services/navigation.service';
import {OnInit} from '@angular/core';
import {UserManager} from '../../../services/user-manager.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'contact-form',
  styleUrls: ['./contact-form.component.scss'],
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  public apiErrors: ApiErrors = new ApiErrors([]);
  public contactForm: FormGroup;
  public loadingSubmit: boolean = false;

  constructor(
    private contactProxy: ContactProxy,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userManager: UserManager
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    const user = this.userManager.getUser();
    const name: string = user ? user.name : '';
    const email: string = user ? user.email : '';
    this.contactForm = this.formBuilder.group({
      'email': [email, Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'message': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'name': [name, Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  public submitForm(value: any) {
    this.loadingSubmit = true;

    this.contactProxy.saveContactNotification(
      new ContactNotification({
        body: value.message,
        email: value.email,
        name: value.name
      }))
      .then((result) => {
        this.navigationService.navigate(JARoutes.confirmation, 'contact-message-sent');
        this.loadingSubmit = false;
      })
      .catch((errors) => {
        this.apiErrors = errors;
        this.loadingSubmit = false;
      });
  }
}
