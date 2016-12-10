import {Component, OnInit} from '@angular/core';
import {ContactNotification} from '../../models/contact-notification';
import {ContactProxy} from '../../services/proxy/contact-proxy.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactProxy]
})
export class ContactComponent {
  name: string;
  email: string;
  message: string;

  errors: Object = {};

  constructor(private contactProxy: ContactProxy, private router: Router) {
  }

  onContactButtonClick() {

    this.errors = {};

    this.contactProxy.saveContactNotification(
      new ContactNotification({
        name: this.name,
        email: this.email,
        body: this.message
      }))
      .then(result => this.router.navigate(['/home']))
      .catch(errors => {
        this.errors = errors;
      });
  }
}
