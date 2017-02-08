import {JARoute} from './ja-route';

export class JARoutes {
  public static home: JARoute = { url: () => ''};
  public static login: JARoute = { url: () => '/login'};
  public static forgotPassword: JARoute = { url: () => '/forgot-password'};
  public static resetPassword: JARoute = { url: (args?: string[]) => '/reset-password/' + args[0]};
  public static faq: JARoute = { url: () => '/faq'};
  public static contact: JARoute = { url: () => '/contact'};
  public static confirmation: JARoute = { url: (args?: string[]) => '/confirmation/' + args[0]};
  public static aboutCookies: JARoute = { url: () => '/cookies-about'};
  public static jobs: JARoute = { url: (args?: string[]) => '/jobs/' + args[0]};
  public static job: JARoute = { url: (args?: string[]) => '/job/' + args[0]};
  public static registerUser: JARoute = { url: () => '/user/register'};
  public static user: JARoute = { url: (args?: string[]) => '/users/' + args[0]};
  public static userJobs: JARoute = { url: (args?: string[]) => '/users/' + args[0] + '/jobs'};
  public static error: JARoute = { url: (args?: string[]) => '/error/' + args[0]};
  public static notFound: JARoute = { url: () => '/404'};
}
