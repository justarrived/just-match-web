import {Injectable} from '@angular/core';
import {
  Router,
  NavigationStart,
  RoutesRecognized,
  NavigationCancel,
  NavigationEnd,
  NavigationError
} from '@angular/router';

@Injectable()
export class NavigationService {
  states: Array<String> = [];
  currentState: string;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Starting navigation to ' + event)
      }

      if (event instanceof NavigationEnd) {
        this.currentState = router.url;
        this.states.push(router.url);
        console.log('Navigation ended at ' + this.currentState);
      }

      if (event instanceof NavigationCancel) {
        console.log('NavigationCancel');
      }

      if (event instanceof NavigationError) {
        console.log('NavigationError', event);
      }

      if (event instanceof RoutesRecognized) {
        console.log('RoutesRecognized');
      }
    });
  }

  navigateToAbout(): void  {
    this.router.navigate(['/about']);
  }

  navigateBack(): void {
    this.router.navigate([this.states.pop()]);
  }

  navigateToConfirmationContactMessageSent(): void {
    this.router.navigate(['/confirmation/contact-message-sent']);
  }

  navigateToConfirmationPasswordResetLinkSent(): void {
    this.router.navigate(['/confirmation/password-reset-link-sent']);
  }

  navigateToConfirmationUserAppliedForJob(): void {
    this.router.navigate(['/confirmation/user-applied-for-job']);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  navigateToCookiesAbout(): void {
    this.router.navigate(['/cookies-about']);
  }

  navigateToFaq(): void {
    this.router.navigate(['/faq']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToJob(id: string): void {
    this.router.navigate(['/job/' + id]);
  }

  navigateToJobs(page: number): void {
    this.router.navigate(['/jobs/' + page]);
  }

  navigateToLogin(): void  {
    this.router.navigate(['/about']);
  }

  navigateToRegisterUser(): void  {
    this.router.navigate(['/user/register']);
  }

  navigateToUser(): void  {
    this.router.navigate(['/user']);
  }

  navigateToUserJobs(): void  {
    this.router.navigate(['/my-jobs']);
  }

  navigateToError(statusCode: string): void  {
    this.router.navigate(['/error/' + statusCode]);
  }

  navigateToNotFound(): void  {
    this.router.navigate(['/404']);
  }
}
