import {JARoute} from '../ja-route/ja-route';

export class JARoutes {
  public static aboutCookies: JARoute = { url: () => '/cookies-about'};
  public static applications: JARoute = { url: () => '/user/jobs'};
  public static contact: JARoute = { url: () => '/contact'};
  public static error: JARoute = { url: (args?: string[]) => '/error/' + args[0]};
  public static faq: JARoute = { url: () => '/faq'};
  public static forbidden: JARoute = { url: () => '/forbidden'};
  public static forgotPassword: JARoute = { url: () => '/forgot-password'};
  public static home: JARoute = { url: () => '/home'};
  public static guide: JARoute = { url: () => '/guide'};
  public static job: JARoute = { url: (args?: string[]) => '/job/' + args[0]};
  public static jobs: JARoute = { url: (args?: string[]) => '/jobs/' + args[0]};
  public static login: JARoute = { url: () => '/login'};
  public static lostConnection: JARoute = { url: () => '/lost-connection'};
  public static notFound: JARoute = { url: () => '/404'};
  public static registerUser: JARoute = { url: () => '/register'};
  public static resetPassword: JARoute = { url: (args?: string[]) => '/reset-password/' + args[0]};
  public static user: JARoute = { url: () => '/user'};
}
