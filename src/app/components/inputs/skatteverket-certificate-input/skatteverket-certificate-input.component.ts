import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

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
export class SkatteverketCertificateInputComponent extends BaseComponent {
  @Input() centered: boolean;
  @Input() showLabel: boolean;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
