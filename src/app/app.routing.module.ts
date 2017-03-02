import {LoggedInGuard} from './services/logged-in-guard.service';
import {ConfirmationComponent} from './views/confirmation/confirmation.component';
import {ContactPageComponent} from './views/contact/contact-page.component';
import {CookiesAboutComponent} from './views/cookies-about/cookies-about.component';
import {ErrorComponent} from './views/error/error.component';
import {FaqComponent} from './views/faq/faq.component';
import {ForgotPasswordComponent} from './views/forgot-password/forgot-password.component';
import {HomeComponent} from './views/home/home.component';
import {JARoute} from './routes/ja-route';
import {JobDetailsComponent} from './views/job-details/job-details.component';
import {JobsComponent} from './views/jobs/jobs.component';
import {LoginPageComponent} from './views/login/login-page.component';
import {MyJobsComponent} from './views/my-jobs/my-jobs.component';
import {NgModule} from '@angular/core';
import {NotFoundComponent} from './views/404/404.component';
import {NotLoggedInGuard} from './services/not-logged-in-guard.service';
import {ResetPasswordComponent} from './views/reset-password/reset-password.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterPageComponent} from './views/register/register-page.component';
import {UserSettingsComponent} from './views/user/user-settings/user-settings.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'confirmation/:type', component: ConfirmationComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'cookies-about', component: CookiesAboutComponent },
  { path: 'error/:statusCode', component: ErrorComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', redirectTo: ''},
  { path: 'job/:id', component: JobDetailsComponent },
  { path: 'jobs', redirectTo: 'jobs/1', pathMatch: 'full'},
  { path: 'jobs/:page', component: JobsComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'reset-password', redirectTo: '404', pathMatch: 'full'},
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'user/register', component: RegisterPageComponent, canActivate: [NotLoggedInGuard]},
  { path: 'users/:user-id', component: UserSettingsComponent, canActivate: [LoggedInGuard] },
  { path: 'users/:user-id/jobs', component: MyJobsComponent, canActivate: [LoggedInGuard] },
  { path: '**', redirectTo: '404' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoggedInGuard, NotLoggedInGuard]
})

export class AppRoutingModule { }
