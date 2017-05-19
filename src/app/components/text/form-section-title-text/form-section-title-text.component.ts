import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'form-section-title-text',
  template: `
    <div
      class="ui horizontal divider pink header"
      style="margin-top: 1rem">
      <basic-title-text
        [iconLeft]="icon"
        [text]="text"
        display="inline-block"
        fontSize="small"
        textAlignmentLtr="center"
        marginTop="1rem"
        textAlignmentRtl="center">
      </basic-title-text>
    </div>`
})
export class FormSectionTitleTextComponent {
  @Input() public icon: string;
  @Input() public text: string;
}
