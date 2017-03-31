import {ContactPageComponent} from '../components/pages/contact-page/contact-page.component';
import {CookiesAboutPageComponent} from '../components/pages/cookies-about-page/cookies-about-page.component';
import {DefaultLayoutComponent} from '../components/layouts/default-layout/default-layout.component';
import {ErrorPageComponent} from '../components/pages/error-page/error-page.component';
import {FaqPageComponent} from '../components/pages/faq-page/faq-page.component';
import {ForgotPasswordPageComponent} from '../components/pages/forgot-password-page/forgot-password-page.component';
import {GuardsModule} from '../guards/guards.module';
import {HomePageComponent} from '../components/pages/home-page/home-page.component';
import {JARoute} from './ja-route/ja-route';
import {JobDetailsComponent} from '../views/job-details/job-details.component';
import {JobsComponent} from '../views/jobs/jobs.component';
import {LoginPageComponent} from '../components/pages/login-page/login-page.component';
import {MyJobsComponent} from '../views/my-jobs/my-jobs.component';
import {NgModule} from '@angular/core';
import {NotFoundPageComponent} from '../components/pages/404-page/404-page.component';
import {RegisterPageComponent} from '../components/pages/register-page/register-page.component';
import {ResetPasswordPageComponent} from '../components/pages/reset-password-page/reset-password-page.component';
import {ResolversModule} from '../resolvers/resolvers.module';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {SystemLanguagesResolver} from '../resolvers/system-languages/system-languages.resolver';
import {UserProfilePageComponent} from '../components/pages/user-profile-page/user-profile-page.component';
import {UserResolver} from '../resolvers/user/user.resolver';
import {LoggedInGuard} from '../guards/logged-in/logged-in.guard';
import {NotLoggedInGuard} from '../guards/not-logged-in/not-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    resolve: {systemLanguages: SystemLanguagesResolver, user: UserResolver},
    children: [
    { path: '', pathMatch: 'full', component: HomePageComponent},
    { path: '404', component: NotFoundPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'cookies-about', component: CookiesAboutPageComponent },
    { path: 'error/:statusCode', component: ErrorPageComponent },
    { path: 'faq', component: FaqPageComponent },
    { path: 'forgot-password', component: ForgotPasswordPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'home', redirectTo: '' },
    { path: 'job/:id', component: JobDetailsComponent },
    { path: 'jobs', redirectTo: 'jobs/1', pathMatch: 'full' },
    { path: 'jobs/:page', component: JobsComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'register', component: RegisterPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'reset-password', redirectTo: '404', pathMatch: 'full', canActivate: [NotLoggedInGuard] },
    { path: 'reset-password/:token', component: ResetPasswordPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'user', component: UserProfilePageComponent, canActivate: [LoggedInGuard] },
    { path: 'user/jobs', component: MyJobsComponent, canActivate: [LoggedInGuard] },
    { path: '**', redirectTo: '404' },
  ]}
];

@NgModule({
  imports: [
    GuardsModule,
    ResolversModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    ResolversModule,
    RouterModule
  ]
})
export class RoutesModule { }