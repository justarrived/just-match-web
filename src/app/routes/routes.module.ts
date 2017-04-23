import {ContactPageComponent} from '../components/pages/contact-page/contact-page.component';
import {CookiesAboutPageComponent} from '../components/pages/cookies-about-page/cookies-about-page.component';
import {DefaultLayoutComponent} from '../components/layouts/default-layout/default-layout.component';
import {ErrorPageComponent} from '../components/pages/error-page/error-page.component';
import {FaqPageComponent} from '../components/pages/faq-page/faq-page.component';
import {ForbiddenPageComponent} from '../components/pages/forbidden-page/forbidden-page.component';
import {ForgotPasswordPageComponent} from '../components/pages/forgot-password-page/forgot-password-page.component';
import {GuardsModule} from '../guards/guards.module';
import {GuidePageComponent} from '../components/pages/guide/guide-page.component';
import {HomePageComponent} from '../components/pages/home-page/home-page.component';
import {JARoute} from './ja-route/ja-route';
import {JobPageComponent} from '../components/pages/job-page/job-page.component';
import {JobsPageComponent} from '../components/pages/jobs-page/jobs-page.component';
import {LoggedInGuard} from '../guards/logged-in/logged-in.guard';
import {LoginPageComponent} from '../components/pages/login-page/login-page.component';
import {LostConnectionPageComponent} from '../components/pages/lost-connection-page/lost-connection-page.component';
import {MyJobsComponent} from '../views/my-jobs/my-jobs.component';
import {NgModule} from '@angular/core';
import {NotFoundPageComponent} from '../components/pages/404-page/404-page.component';
import {NotLoggedInGuard} from '../guards/not-logged-in/not-logged-in.guard';
import {RegisterPageComponent} from '../components/pages/register-page/register-page.component';
import {ResetPasswordPageComponent} from '../components/pages/reset-password-page/reset-password-page.component';
import {ResolversModule} from '../resolvers/resolvers.module';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {SystemLanguagesResolver} from '../resolvers/system-languages/system-languages.resolver';
import {UserProfilePageComponent} from '../components/pages/user-profile-page/user-profile-page.component';
import {UserResolver} from '../resolvers/user/user.resolver';

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
    { path: 'forbidden', component: ForbiddenPageComponent },
    { path: 'forgot-password', component: ForgotPasswordPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'guide', component: GuidePageComponent, canActivate: [LoggedInGuard] },
    { path: 'home', redirectTo: '' },
    { path: 'job/:id', component: JobPageComponent },
    { path: 'jobs', redirectTo: 'jobs/1', pathMatch: 'full' },
    { path: 'jobs/:page', component: JobsPageComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'lost-connection', component: LostConnectionPageComponent },
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
