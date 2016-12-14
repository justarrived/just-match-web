import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ContactNotification} from '../../models/contact-notification';
import {ContactProxy} from '../../services/proxy/contact-proxy.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactProxy]
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private contactProxy: ContactProxy, private router: Router, private formBuilder: FormBuilder) {
    this.contactForm = formBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'message': [null, Validators.compose([Validators.required, Validators.minLength(2)])]
    })
  }

  submitForm(value: any) {
    this.contactProxy.saveContactNotification(
      new ContactNotification({
        name: value.name,
        email: value.email,
        body: value.message
      }))
      .then(result => this.router.navigate(['/contact/confirmation']))
      .catch(errors => {
        console.log(errors);
      });
  }
}
