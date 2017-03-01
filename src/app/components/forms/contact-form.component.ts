import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ContactNotification} from '../../models/contact-notification';
import {ContactProxy} from '../../services/proxy/contact-proxy.service';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';
import {UserManager} from '../../services/user-manager.service';
import {ApiErrors} from '../../models/api-errors';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  providers: [ContactProxy]
})
export class ContactFormComponent {
  private contactForm: FormGroup;
  private loadingSubmit: boolean = false;
  private apiErrors: ApiErrors = new ApiErrors([]);

  constructor(
    private contactProxy: ContactProxy,
    private navigationService: NavigationService,
    private userManager: UserManager,
    private formBuilder: FormBuilder
  ) {
    const user = userManager.getUser();
    const email: string = user ? user.email : '';
    this.contactForm = formBuilder.group({
      'name': [user.name, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': [email, Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'message': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  private submitForm(value: any) {
    this.loadingSubmit = true;

    this.contactProxy.saveContactNotification(
      new ContactNotification({
        name: value.name,
        email: value.email,
        body: value.message
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
