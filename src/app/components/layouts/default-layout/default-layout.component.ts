import {Component} from '@angular/core';

@Component({
  selector: 'default-layout',
  styleUrls: ['./default-layout.component.scss'],
  template: `
    <div class=layout-wrapper>
      <default-navigation></default-navigation>
      <div class="layout-inner-wrapper">
        <div class="layout-header-padder"></div>
        <section class="layout-content">
          <cookie-bar></cookie-bar>
          <router-outlet></router-outlet>
        </section>
        <default-footer class="layout-footer"></default-footer>
      </div>
    </div>`
})
export class DefaultLayoutComponent{}
