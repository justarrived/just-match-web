import {Component} from '@angular/core';

@Component({
  selector: 'how-it-works-and-maximize-chances-section',
  styleUrls: ['./how-it-works-and-maximize-chances-section.component.scss'],
  template: `
    <div class="ui grid">
      <how-it-works-section
        class="sixteen wide phone eight wide tablet eight wide computer column how-it-works-section">
      </how-it-works-section>
      <maximize-chances-section
        class="sixteen wide phone eight wide tablet eight wide computer column maximize-chances-section">
      </maximize-chances-section>
    </div>
    `
})
export class HowItWorksAndMaximizeChancesSectionComponent {
}
