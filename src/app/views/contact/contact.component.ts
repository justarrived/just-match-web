import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ContactNotification} from '../../models/contact-notification';
import {ContactProxy} from '../../services/proxy/contact-proxy.service';
import {NavigationService} from '../../services/navigation.service';
import {JARoutes} from '../../routes/ja-routes';
import {UserManager} from '../../services/user-manager.service';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactProxy]
})
export class ContactComponent {
  private contactForm: FormGroup;
  private errors: any = {};
  private loadingSubmit: boolean = false;

  constructor(
    private contactProxy: ContactProxy,
    private navigationService: NavigationService,
    private userManager: UserManager,
    private formBuilder: FormBuilder
  ) {
    const user = userManager.getUser();

    this.contactForm = formBuilder.group({
      'name': [user ? user.firstName + ' ' + user.lastName : '', Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': [user ? user.email : '', Validators.compose([Validators.required, Validators.minLength(6)])],
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
        this.errors = errors.details || errors;
        this.loadingSubmit = false;
      });
  }
}
