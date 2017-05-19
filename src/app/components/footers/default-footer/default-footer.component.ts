import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'default-footer',
  styleUrls: ['./default-footer.component.scss'],
  template: `
      <div class="footer-container ui stackable grid">
        <div
          class="left aligned four wide column">
          <basic-link
            [text]="'applications.title' | translate"
            color="white"
            href="https://justarrived.se"
            marginBottom="0"
            marginTop="0"
            textAlignmentLtr="left"
            textAlignmentRtl="left"
            textAlignmentLtrMobile="center"
            textAlignmentRtlMobile="center">
          </basic-link>
        </div>
        <div
          class="center aligned eight wide column">
          <basic-link
            [text]="'Birger Jarlsgatan 57C, 113 56 Stockholm'"
            color="white"
            href="https://www.google.se/maps/place/Birger+Jarlsgatan+57C,+113+56+Stockholm/@59.3415145,18.0622277,17z/data=!3m1!4b1!4m5!3m4!1s0x465f9d684ea80717:0xe518a0937ab3f86c!8m2!3d59.3415145!4d18.0644164"
            marginBottom="0"
            marginTop="0"
            textAlignmentLtr="center"
            textAlignmentRtl="center"
            textAlignmentLtrMobile="center"
            textAlignmentRtlMobile="center">
          </basic-link>
        </div>
        <div
          class="right aligned four wide column"
          href="mailto:hej@justarrived.se">
          <basic-link
            [text]="'hej@justarrived.se'"
            color="white"
            href="mailto:hej@justarrived.se"
            marginBottom="0"
            marginTop="0"
            textAlignmentLtr="right"
            textAlignmentRtl="right"
            textAlignmentLtrMobile="center"
            textAlignmentRtlMobile="center">
          </basic-link>
        </div>
      </div>`
})
export class DefaultFooterComponent {}
