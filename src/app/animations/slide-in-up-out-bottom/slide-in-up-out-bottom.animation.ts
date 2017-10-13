import {animate} from '@angular/animations';
import {state} from '@angular/animations';
import {style} from '@angular/animations';
import {transition} from '@angular/animations';
import {trigger} from '@angular/animations';

export function slideInUpOutBottomAnimation(duration: string, translateDistance: string) {
  return trigger('slideInUpOutBottomAnimation', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, ' + translateDistance + ', 0)'
      })),
      transition('out => in', animate(duration + ' ease-in-out')),
      transition('in => out', animate(duration + ' ease-in-out'))
    ]);
}
