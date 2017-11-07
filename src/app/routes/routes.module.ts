import {ApplicationsPageComponent} from '../components/pages/applications-page/applications-page.component';
import {BasicUserDataPageComponent} from '../components/pages/basic-user-data-page/basic-user-data-page.component';
import {ContactPageComponent} from '../components/pages/contact-page/contact-page.component';
import {CookiesAboutPageComponent} from '../components/pages/cookies-about-page/cookies-about-page.component';
import {DefaultLayoutComponent} from '../components/layouts/default-layout/default-layout.component';
import {ErrorPageComponent} from '../components/pages/error-page/error-page.component';
import {FaqPageComponent} from '../components/pages/faq-page/faq-page.component';
import {ForbiddenPageComponent} from '../components/pages/forbidden-page/forbidden-page.component';
import {ForgotPasswordPageComponent} from '../components/pages/forgot-password-page/forgot-password-page.component';
import {GodModePageComponent} from '../components/pages/god-mode-page/god-mode-page.component';
import {GuidePageComponent} from '../components/pages/guide-page/guide-page.component';
import {GuideSectionPageComponent} from '../components/pages/guide-section-page/guide-section-page.component';
import {GuideSectionArticlePageComponent} from '../components/pages/guide-section-article-page/guide-section-article-page.component';
import {GuardsModule} from '../guards/guards.module';
import {HomePageComponent} from '../components/pages/home-page/home-page.component';
import {JARoute} from './ja-route/ja-route';
import {JobPageComponent} from '../components/pages/job-page/job-page.component';
import {JobsPageComponent} from '../components/pages/jobs-page/jobs-page.component';
import {LoggedInAdminGuard} from '../guards/logged-in-admin/logged-in-admin.guard';
import {LoggedInGuard} from '../guards/logged-in/logged-in.guard';
import {LoginPageComponent} from '../components/pages/login-page/login-page.component';
import {LostConnectionPageComponent} from '../components/pages/lost-connection-page/lost-connection-page.component';
import {NgModule} from '@angular/core';
import {NotFoundPageComponent} from '../components/pages/404-page/404-page.component';
import {NotLoggedInGuard} from '../guards/not-logged-in/not-logged-in.guard';
import {RegisterPageComponent} from '../components/pages/register-page/register-page.component';
import {ResetPasswordPageComponent} from '../components/pages/reset-password-page/reset-password-page.component';
import {ResolversModule} from '../resolvers/resolvers.module';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {SubscriptionsPageComponent} from '../components/pages/subscriptions-page/subscriptions-page.component';
import {SupportChatPageComponent} from '../components/pages/support-chat-page/support-chat-page.component';
import {SystemLanguagesResolver} from '../resolvers/system-languages/system-languages.resolver';
import {UserProfilePageComponent} from '../components/pages/user-profile-page/user-profile-page.component';
import {UserNotificationSettingsPageComponent} from '../components/pages/user-notification-settings-page/user-notification-settings-page.component';
import {UserResolver} from '../resolvers/user/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    resolve: {systemLanguages: SystemLanguagesResolver, user: UserResolver},
    children: [
    { path: '', pathMatch: 'full', component: HomePageComponent},
    { path: '404', component: NotFoundPageComponent },
    { path: 'applications', component: ApplicationsPageComponent, canActivate: [LoggedInGuard] },
    { path: 'contact', component: ContactPageComponent },
    { path: 'cookies-about', component: CookiesAboutPageComponent },
    { path: 'error/:statusCode', component: ErrorPageComponent },
    { path: 'faq', component: FaqPageComponent },
    { path: 'forbidden', component: ForbiddenPageComponent },
    { path: 'forgot-password', component: ForgotPasswordPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'god-mode', component: GodModePageComponent, canActivate: [LoggedInAdminGuard] },
    { path: 'guide', component: GuidePageComponent },
    { path: 'guide/section/:sectionId', component: GuideSectionPageComponent },
    { path: 'guide/section/:sectionId/:sectionSlug', component: GuideSectionPageComponent },
    { path: 'guide/section/:sectionId/:sectionSlug/article/:articleId/:articleSlug', component: GuideSectionArticlePageComponent },
    { path: 'guide/section/:sectionId/article/:articleId', component: GuideSectionArticlePageComponent },
    { path: 'home', redirectTo: '' },
    { path: 'job/:id', component: JobPageComponent },
    { path: 'jobs', redirectTo: 'jobs/1', pathMatch: 'full' },
    { path: 'jobs/:page', component: JobsPageComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'lost-connection', component: LostConnectionPageComponent },
    { path: 'register', component: RegisterPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'reset-password', redirectTo: '404', pathMatch: 'full', canActivate: [NotLoggedInGuard] },
    { path: 'reset-password/:token', component: ResetPasswordPageComponent, canActivate: [NotLoggedInGuard] },
    { path: 'support-chat', component: SupportChatPageComponent, canActivate: [LoggedInGuard] },
    { path: 'subscriptions', component: SubscriptionsPageComponent },
    { path: 'subscriptions/:subscriberUuid', component: SubscriptionsPageComponent },
    { path: 'user', component: UserProfilePageComponent, canActivate: [LoggedInGuard] },
    { path: 'user-notification-settings', component: UserNotificationSettingsPageComponent, canActivate: [LoggedInGuard] },
    { path: 'update-profile', component: BasicUserDataPageComponent, canActivate: [LoggedInGuard] },
    { path: '**', component: NotFoundPageComponent },
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
