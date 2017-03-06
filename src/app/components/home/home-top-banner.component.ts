import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes';
import {User} from '../../models/user';

@Component({
  selector: 'home-top-banner',
  template: `
<div class="home-header-container">
  <img class="home-header-map-image" src="/assets/images/startpagemap.png" alt="Map" />
  <div class="home-header-info-container home-header-info-container-logged-in" *ngIf="user">
    <h2 class="home-header-info-title">
      {{'home.header.logged.in.title'| translate: {username: user.firstName} }}
    </h2>
    <div class="home-header-button-container">
      <a
        routerLink="{{JARoutes.user.url([user.id])}}"
        class="home-header-button btn-secondary-light btn-small btn">
        {{'home.header.logged.in.profile.button'| translate}}
      </a><br>
      <a
        routerLink="{{JARoutes.jobs.url(['1'])}}"
        class="home-header-button btn-primary-light btn-small btn">
        {{'home.header.logged.in.jobs.button'| translate}}
      </a>
    </div>
  </div>
  <div class="home-header-info-container" *ngIf="!user">
    <h2 class="home-header-info-title">
      {{'home.header.logged.out.title' | translate }}
    </h2>
    <h4 class="home-header-info-subtitle">
      {{'home.header.logged.out.sub.title' | translate }}
    </h4>
    <div class="home-header-info-description-container">
      {{'home.header.logged.out.description' | translate }}
    </div>
    <div class="home-header-button-container">
      <a
        routerLink="{{JARoutes.registerUser.url()}}"
        class="home-header-button btn-secondary-light btn-small btn">
        {{'home.header.logged.out.register.button'| translate}}
      </a><br/>
      <a
        routerLink="{{JARoutes.login.url()}}"
        class="home-header-button btn-primary-light btn-small btn">
        {{'home.header.logged.out.login.button'| translate}}
      </a>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./home-top-banner.component.scss']
})
export class HomeTopBannerComponent {
  @Input() user: User;
  @Input() JARoutes = JARoutes;
}
