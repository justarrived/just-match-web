import {Component} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'how-it-works-and-maximize-chances-section',
  styleUrls: ['./how-it-works-and-maximize-chances-section.component.scss'],
  template: `
    <div
      class="ui grid"
      [style.direction]="systemLanguage.direction">
      <how-it-works-section
        class="sixteen wide phone eight wide tablet eight wide computer column how-it-works-section">
      </how-it-works-section>
      <maximize-chances-section
        class="sixteen wide phone eight wide tablet eight wide computer column maximize-chances-section">
      </maximize-chances-section>
    </div>
    `
})
export class HowItWorksAndMaximizeChancesSectionComponent implements OnInit, OnDestroy {

  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public constructor(
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public ngOnInit(): void {
    this.initSystemLanguage()
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }
}
