import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'skatteverket-certificate-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.skatteverket.certificate.header' | translate"
    [label]="'input.skatteverket.certificate.label' | translate"
    [showLabel]="showLabel"
    [subHeader]="'input.skatteverket.certificate.description' | translate"
    [user]="user"
    imageType="skatteverket_certificate">
  </user-image-card-input>
  `
})
export class SkatteverketCertificateInputComponent {
  @Input() user: User;
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
