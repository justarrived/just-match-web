import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'welcome-user-title',
  template: `
  <basic-title-text
    *ngIf="isNamePresent"
    [text]="'home.header.logged.in.title'| translate: {username: name}"
    color="white"
    fontSize="large"
    textAlignmentLtr="left"
    textAlignmentLtrTablet="center"
    textAlignmentRtl="left"
    textAlignmentRtlTablet="center">
  </basic-title-text>

  <basic-title-text
    *ngIf="!isNamePresent"
    [text]="'home.header.logged.out.title' | translate"
    color="white"
    fontSize="large"
    textAlignmentLtr="left"
    textAlignmentLtrTablet="center"
    textAlignmentRtl="right"
    textAlignmentRtlTablet="center">
  </basic-title-text>
  `
})
export class WelcomeUserTitleComponent {
  @Input() public name: string = null;

  get isNamePresent(): boolean {
    return this.name != null;
  }
}
