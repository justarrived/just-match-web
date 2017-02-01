import {JARoute} from './ja-route';
import {HomeComponent} from '../views/home/home.component';
import {AuthGuard} from '../services/auth-guard.service';
import {UserRegisterComponent} from '../views/user/user-register/user-register.component';
import {UserSettingsComponent} from '../views/user/user-settings/user-settings.component';
import {LoginComponent} from '../views/login/login.component';
import {ForgotPasswordComponent} from '../views/forgot-password/forgot-password.component';
import {FaqComponent} from '../views/faq/faq.component';
import {ContactComponent} from '../views/contact/contact.component';
import {JobsComponent} from '../views/jobs/jobs.component';
import {JobDetailsComponent} from '../views/job-details/job-details.component';
import {ConfirmationComponent} from '../views/confirmation/confirmation.component';
import {CookiesAboutComponent} from '../views/cookies-about/cookies-about.component';
import {MyJobsComponent} from '../views/my-jobs/my-jobs.component';
import {ErrorComponent} from '../views/error/error.component';
import {NotFoundComponent} from '../views/404/404.component';

export class JARoutes {
  public static home: JARoute = { url: () => '', path: '', pathMatch: 'full', component: HomeComponent };
  public static login: JARoute = { url: () => 'login', path: 'login', component: LoginComponent };
  public static forgotPassword: JARoute = { url: () => 'reset-password', path: 'reset-password', component: ForgotPasswordComponent };
  public static faq: JARoute = { url: () => 'faq', path: 'faq', component: FaqComponent };
  public static contact: JARoute = { url: () => 'contact', path: 'contact', component: ContactComponent };
  public static confirmation: JARoute = { url: (args?: string[]) => 'confirmation/' + args[0], path: 'confirmation/:type', component: ConfirmationComponent };
  public static aboutCookies: JARoute = { url: () => 'cookies-about', path: 'cookies-about', component: CookiesAboutComponent };
  public static jobs: JARoute = { url: (args?: string[]) => 'jobs/' + args[0], path: 'jobs/:page', component: JobsComponent };
  public static job: JARoute = { url: (args?: string[]) => 'job/' + args[0], path: 'job/:id', component: JobDetailsComponent };
  public static registerUser: JARoute = { url: () => 'user/register', path: 'user/register', component: UserRegisterComponent };
  public static user: JARoute = { url: (args?: string[]) => 'users/' + args[0], path: 'users/:user-id', component: UserSettingsComponent, canActivate: [AuthGuard] };
  public static userJobs: JARoute = { url: (args?: string[]) => 'users/' + args[0] + '/jobs', path: 'users/:user-id/jobs', component: MyJobsComponent, canActivate: [AuthGuard] };
  public static error: JARoute = { url: (args?: string[]) => 'error/' + args[0], path: 'error/:statusCode', component: ErrorComponent };
  public static notFound: JARoute = { url: () => '404', path: '404', component: NotFoundComponent };
  public static catchOthers: JARoute = { url: () => '**', path: '**', redirectTo: '404' };
}
