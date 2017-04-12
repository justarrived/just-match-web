import {animate} from '@angular/animations';
import {state} from '@angular/animations';
import {style} from '@angular/animations';
import {transition} from '@angular/animations';
import {trigger} from '@angular/animations';

export function slideInLeftOutRight(duration: string) {
  return trigger('slideInLeftOutRight', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate(duration + ' ease-in-out')),
      transition('out => in', animate(duration + ' ease-in-out'))
    ]);
}
