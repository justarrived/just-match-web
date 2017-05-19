import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {User} from '../../../models/api-models/user/user';

@Component({
  selector: 'skatteverket-certificate-input',
  template: `
  <user-image-card-input
    [centered]="centered"
    [header]="'input.skatteverket.certificate.header' | translate"
    [label]="'input.skatteverket.certificate.label' | translate"
    [showLabel]="showLabel"
    [description]="'input.skatteverket.certificate.description' | translate"
    imageField="skatteverketCertificateImage"
    imageType="skatteverket_certificate">
  </user-image-card-input>
  `
})
export class SkatteverketCertificateInputComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;
}
