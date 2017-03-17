import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes';
import {Subscription} from 'rxjs/Subscription';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../models/user';
import {UserManager} from '../../../services/user-manager.service';

@Component({
  selector: 'default-layout',
  styleUrls: ['./default-layout.component.scss'],
  template: `
    <div class=layout-wrapper>
      <default-navigation
        [user]="user">
      </default-navigation>

      <div class="wrapper">
        <div class="header-padder-table-row"></div>
        <section class="app-content-container">
          <cookie-bar></cookie-bar>
          <router-outlet></router-outlet>
        </section>
        <footer class="footer">
          <div>
            <div>
              <p>
                <span>{{'applications.title' | translate}}</span>
              </p>
              <p>
                <span>Birger Jarlsgatan 57C,</span>
                <span>113 56 Stockholm</span>
              </p>
              <p><a href="mailto:hej@justarrived.se"><span>hej@justarrived.se</span></a></p>
            </div>
          </div>
        </footer>
      </div>
    </div>`
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public user: User;
  public JARoutes = JARoutes;

  private userChangeSubscription1: Subscription;
  private userChangeSubscription2: Subscription;

  constructor(
    private router: Router,
    private authManager: AuthManager,
    private userManager: UserManager
  ) {

  }

  public ngOnInit() {
    this.authManager.authenticateIfNeeded().then(result => {
      this.router.initialNavigation();
      this.user = result;
    });

    this.userChangeSubscription1 = this.authManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });

    this.userChangeSubscription2 = this.userManager.getUserChangeEmmiter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy() {
    this.userChangeSubscription1.unsubscribe();
    this.userChangeSubscription2.unsubscribe();
  }
}
