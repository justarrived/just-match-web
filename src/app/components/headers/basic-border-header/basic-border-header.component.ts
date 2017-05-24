import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'basic-border-header',
  styleUrls: ['./basic-border-header.component.scss'],
  template: `
  <div class="ui basic center aligned segment basic-border-header-container">
    <basic-title-text
      [iconLeft]="icon"
      [text]="header"
      color="white"
      fontSize="large"
      marginTop="1rem"
      textAlignmentLtr="center"
      textAlignmentRtl="center">
    </basic-title-text>
  </div>`
})
export class BasicBorderHeaderComponent {
  @Input() header: string;
  @Input() icon: string;
}
