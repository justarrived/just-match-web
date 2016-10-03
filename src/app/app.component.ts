import {Component, OnInit} from "@angular/core";
import {AuthManager} from "./services/auth-manager.service";
import {Router, NavigationStart, RoutesRecognized, NavigationCancel, NavigationEnd, NavigationError} from "@angular/router";

@Component({
  selector: "app",
  templateUrl: "./app/app.html"
})
export class AppComponent implements OnInit {
  constructor(private authManager: AuthManager, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd');
      }

      if (event instanceof NavigationCancel) {
        console.log('NavigationCancel');
      }

      if (event instanceof NavigationError) {
        console.log('NavigationError');
      }

      if (event instanceof RoutesRecognized) {
        console.log('RoutesRecognized');
      }
    });
  }

  ngOnInit() {
    console.log("Application component initialized ...");
    this.authManager.authenticateIfNeeded().then(result => {
      if (result == null) {
        this.router.navigate(['/home']);
        return;
      }
      this.router.initialNavigation();
    });

  }
}
