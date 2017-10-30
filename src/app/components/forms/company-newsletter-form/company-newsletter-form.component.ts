import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'company-newsletter-form',
  styleUrls: ['./company-newsletter-form.component.scss'],
  template: `
  <div class="newsletter-form">
    <basic-title-text
      fontSize="large"
      [text]="'section.company_newsletter.header' | translate">
    </basic-title-text>
    <basic-text
      [text]="'section.company_newsletter.body' | translate">
    </basic-text>

    <form ngNoForm id="up-form" name="form_9084u720ab9707b654e9cb66d68d085b53e89" action="https://power.upsales.com/api/external/formSubmit" method="POST">
      <div>
        <input
          maxlength="512"
          type="email"
          name="Contact.email"
          required="required"
          [placeholder]="'input.email.label' | translate">
      </div>
      <!-- REQUIRED FIELDS -->
      <input type="hidden" name="formCid" value="9084">
      <input type="hidden" name="formId" value="9084u720ab9707b654e9cb66d68d085b53e89">
      <input type="hidden" name="isFrame" value="false">
      <input type="text" value="" name="validation" style="display: none;">
      <!-- END OF REQUIRED FIELDS -->
      <div class="submit-field">
        <base-action-button
          [buttonText]="'section.company_newsletter.subscribe' | translate"
          [fluid]="false"
          buttonType="submit"
          kind="secondary">
        </base-action-button>
      </div>
    </form>
  </div>
  `
})
export class CompanyNewsletterFormComponent extends BaseComponent {
  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
