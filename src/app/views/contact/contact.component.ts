import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ContactNotification} from '../../models/contact-notification';
import {ContactProxy} from '../../services/proxy/contact-proxy.service';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactProxy]
})
export class ContactComponent {
  private contactForm: FormGroup;
  private errors: any = {};

  constructor(
    private contactProxy: ContactProxy,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = formBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'message': [null, Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  private submitForm(value: any) {
    this.contactProxy.saveContactNotification(
      new ContactNotification({
        name: value.name,
        email: value.email,
        body: value.message
      }))
      .then((result) => {
        this.navigationService.navigate(JARoutes.confirmation, 'contact-message-sent')
      })
      .catch((errors) => {
        this.errors = errors.details || errors;
      });
  }
}
