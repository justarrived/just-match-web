import {ConfirmationComponent} from './views/confirmation/confirmation.component';
import {ContactPageComponent} from './views/contact/contact-page.component';
import {CookiesAboutPageComponent} from './views/cookies-about/cookies-about-page.component';
import {DefaultLayoutComponent} from './components/layouts/default-layout/default-layout.component';
import {ErrorPageComponent} from './views/error/error-page.component';
import {FaqPageComponent} from './views/faq/faq-page.component';
import {ForgotPasswordPageComponent} from './views/forgot-password/forgot-password-page.component';
import {HomeComponent} from './views/home/home.component';
import {JARoute} from './routes/ja-route';
import {JobDetailsComponent} from './views/job-details/job-details.component';
import {JobsComponent} from './views/jobs/jobs.component';
import {LoggedInGuard} from './services/logged-in-guard.service';
import {LoginPageComponent} from './views/login/login-page.component';
import {MyJobsComponent} from './views/my-jobs/my-jobs.component';
import {NgModule} from '@angular/core';
import {NotFoundPageComponent} from './views/404/404-page.component';
import {NotLoggedInGuard} from './services/not-logged-in-guard.service';
import {RegisterPageComponent} from './views/register/register-page.component';
import {ResetPasswordPageComponent} from './views/reset-password/reset-password-page.component';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {SystemLanguagesResolver} from './resolvers/system-languages/system-languages.resolver';
import {UserSettingsComponent} from './views/user/user-settings/user-settings.component';

const routes: Routes = [
  { path: '', component: DefaultLayoutComponent, resolve: {systemLanguages: SystemLanguagesResolver}, children: [
    { path: '', pathMatch: 'full', component: HomeComponent},
    { path: '404', component: NotFoundPageComponent },
    { path: 'confirmation/:type', component: ConfirmationComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'cookies-about', component: CookiesAboutPageComponent },
    { path: 'error/:statusCode', component: ErrorPageComponent },
    { path: 'faq', component: FaqPageComponent },
    { path: 'forgot-password', component: ForgotPasswordPageComponent },
    { path: 'home', redirectTo: '' },
    { path: 'job/:id', component: JobDetailsComponent },
    { path: 'jobs', redirectTo: 'jobs/1', pathMatch: 'full' },
    { path: 'jobs/:page', component: JobsComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'reset-password', redirectTo: '404', pathMatch: 'full' },
    { path: 'reset-password/:token', component: ResetPasswordPageComponent },
    { path: 'user/register', component: RegisterPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'users/:user-id', component: UserSettingsComponent, canActivate: [LoggedInGuard] },
    { path: 'users/:user-id/jobs', component: MyJobsComponent, canActivate: [LoggedInGuard] },
    { path: '**', redirectTo: '404' },
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoggedInGuard,
    NotLoggedInGuard,
    SystemLanguagesResolver
  ]
})

export class AppRoutingModule { }
