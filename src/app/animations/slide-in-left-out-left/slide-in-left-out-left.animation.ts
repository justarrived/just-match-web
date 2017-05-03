import {animate} from '@angular/animations';
import {state} from '@angular/animations';
import {style} from '@angular/animations';
import {transition} from '@angular/animations';
import {trigger} from '@angular/animations';

export function slideInLeftOutLeftAnimation(duration: string, translateDistance: string) {
  return trigger('slideInLeftOutLeftAnimation', [
      state('begin', style({
        transform: 'translate3d(' + translateDistance + ', 0, 0)',
        opacity: 0
      })),
      state('in', style({
        transform: 'translate3d(0, 0, 0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translate3d(-' + translateDistance + ', 0, 0)',
        opacity: 0
      })),
      transition('begin => in', animate(duration + ' ease-in-out')),
      transition('in => out', animate(duration + ' ease-in-out'))
    ]);
}
