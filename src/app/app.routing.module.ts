import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './views/about/about.component';
import {HomeComponent} from './views/home/home.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './services/auth-guard.service';
import {UserRegisterComponent} from './views/user/user-register/user-register.component';
import {UserSettingsComponent} from './views/user/user-settings/user-settings.component';
import {LoginComponent} from './views/login/login.component';
import {ForgotPasswordComponent} from './views/forgot-password/forgot-password.component';
import {FaqComponent} from './views/faq/faq.component';
import {ContactComponent} from './views/contact/contact.component';
import {ContactConfirmationComponent} from './views/contact/confirmation/contact-confirmation.component';
import {JobCreateComponent} from './views/jobs/job-create/job-create.component';
import {JobsComponent} from './views/jobs/jobs.component';
import {JobDetailsComponent} from './views/job-details/job-details.component';
import {ConfirmationComponent} from './views/confirmation/confirmation.component';
import {CookiesAboutComponent} from './views/cookies-about/cookies-about.component';
import {CandidateComponent} from './views/candidate/candidate.component';
import {CandidatesComponent} from './views/candidates/candidates.component';
import {MyJobsComponent} from './views/my-jobs/my-jobs.component';
import {ErrorComponent} from './views/error/error.component';
import {NotFoundComponent} from './views/404/404.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent, data: { title: 'About' }, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'faq', component: FaqComponent, data: { title: 'Questions and Answers' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
  { path: 'contact/confirmation', component: ContactConfirmationComponent, data: { title: 'Contact Confirmation' } },
  { path: 'confirmation/:type', component: ConfirmationComponent },
  { path: 'cookies-about', component: CookiesAboutComponent },
  { path: 'job/create', component: JobCreateComponent, data: { roles: ['company'] }, canActivate: [AuthGuard] },
  { path: 'jobs/:page', component: JobsComponent },
  { path: 'job/:id/candidate/:userJobId', component: CandidateComponent },
  { path: 'job/:id/candidates', component: CandidatesComponent },
  { path: 'job/:id', component: JobDetailsComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user', component: UserSettingsComponent, canActivate: [AuthGuard] },
  { path: 'my-jobs', component: MyJobsComponent, canActivate: [AuthGuard] },
  { path: 'error/:statusCode', component: ErrorComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: false })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
