import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'form-section-title-text',
  styleUrls: ['./form-section-title-text.component.scss'],
  template: `
    <div
      class="ui horizontal divider pink header"
      style="margin-top: 1rem">
      <i
        *ngIf="icon"
        class="{{icon}} icon"
        style="display: inline-block; padding: 0; margin-right: .75rem;">
      </i>
      <basic-title-text
        [text]="text"
        display="inline-block"
        fontSize="small"
        ltrTextAlignment="center"
        marginTop="1rem"
        rtlTextAlignment="center">
      </basic-title-text>
    </div>`
})
export class FormSectionTitleTextComponent {
  @Input() public icon: string;
  @Input() public text: string;
}
