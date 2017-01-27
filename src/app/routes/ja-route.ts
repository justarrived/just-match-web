import {Route} from '@angular/router';

export interface JARoute extends Route {
  url(args?: string[]): string;
}
