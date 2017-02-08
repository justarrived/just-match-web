import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './services/auth-guard.service';
import {JARoute} from './routes/ja-route';
import {HomeComponent} from './views/home/home.component';
import {UserRegisterComponent} from './views/user/user-register/user-register.component';
import {UserSettingsComponent} from './views/user/user-settings/user-settings.component';
import {LoginComponent} from './views/login/login.component';
import {ForgotPasswordComponent} from './views/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './views/reset-password/reset-password.component';
import {FaqComponent} from './views/faq/faq.component';
import {ContactComponent} from './views/contact/contact.component';
import {JobsComponent} from './views/jobs/jobs.component';
import {JobDetailsComponent} from './views/job-details/job-details.component';
import {ConfirmationComponent} from './views/confirmation/confirmation.component';
import {CookiesAboutComponent} from './views/cookies-about/cookies-about.component';
import {MyJobsComponent} from './views/my-jobs/my-jobs.component';
import {ErrorComponent} from './views/error/error.component';
import {NotFoundComponent} from './views/404/404.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'confirmation/:type', component: ConfirmationComponent },
  { path: 'cookies-about', component: CookiesAboutComponent },
  { path: 'error/:statusCode', component: ErrorComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'job/:id', component: JobDetailsComponent },
  { path: 'jobs', redirectTo: 'jobs/1', pathMatch: 'full'},
  { path: 'jobs/:page', component: JobsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', redirectTo: '404', pathMatch: 'full'},
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'users/:user-id', component: UserSettingsComponent, canActivate: [AuthGuard] },
  { path: 'users/:user-id/jobs', component: MyJobsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '404' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: false })],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
