import {JARoute} from '../ja-route/ja-route';

export class JARoutes {
  public static aboutCookies: JARoute = { url: () => '/cookies-about'};
  public static applications: JARoute = { url: () => '/applications'};
  public static contact: JARoute = { url: () => '/contact'};
  public static error: JARoute = { url: (args?: string[]) => '/error/' + args[0]};
  public static faq: JARoute = { url: () => '/faq'};
  public static forbidden: JARoute = { url: () => '/forbidden'};
  public static forgotPassword: JARoute = { url: () => '/forgot-password'};
  public static godMode: JARoute = { url: () => '/god-mode'};
  public static guide: JARoute = { url: () => '/guide'};
  public static guideSection: JARoute = { url: (args?: string[]) => '/guide/section/' + args[0] + '/' + args[1]};
  public static guideSectionArticle: JARoute = { url: (args?: string[]) => '/guide/section/' + args[0] + '/' + args[1] + '/article/' + args[2] + '/' + args[3]};
  public static guideSectionArticleSecondary: JARoute = { url: (args?: string[]) => '/guide/section/' + args[0] + '/article/' + args[1]};
  public static guideSectionSecondary: JARoute = { url: (args?: string[]) => '/guide/section/' + args[0]};
  public static home: JARoute = { url: () => '/home'};
  public static job: JARoute = { url: (args?: string[]) => '/job/' + args[0]};
  public static jobs: JARoute = { url: (args?: string[]) => '/jobs/'  + args[0]};
  public static login: JARoute = { url: () => '/login'};
  public static lostConnection: JARoute = { url: () => '/lost-connection'};
  public static notFound: JARoute = { url: () => '/404'};
  public static offline: JARoute = { url: () => '/offline'};
  public static registerUser: JARoute = { url: () => '/register'};
  public static resetPassword: JARoute = { url: (args?: string[]) => '/reset-password/' + args[0]};
  public static subscriptions: JARoute = { url: () => '/subscriptions' };
  public static supportChat: JARoute = { url: () => '/support-chat'};
  public static user: JARoute = { url: () => '/user'};
  public static userNotificationSettings: JARoute = { url: () => '/user-notification-settings'};
  public static basicUserData: JARoute = { url: () => '/update-profile'};
}
