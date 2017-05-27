import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'welcome-user-title',
  template: `
  <basic-title-text
    [text]="buttonText"
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

  constructor(
    private translateService: TranslateService
  ) {}

  get buttonText(): string {
    const key = this.name != null ? 'in' : 'out';
    return this.translateService.instant(
      'home.header.logged.' + key + '.title', { username: this.name }
    );
  }
}
