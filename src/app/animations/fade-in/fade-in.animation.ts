import {animate} from '@angular/animations';
import {state} from '@angular/animations';
import {style} from '@angular/animations';
import {transition} from '@angular/animations';
import {trigger} from '@angular/animations';

export function fadeInAnimation(duration: string) {
  return trigger('fadeInAnimation', [
    state('hidden', style({opacity: 0})),
    state('visible', style({opacity: 1})),
    transition('hidden => visible', [
      animate(duration + ' ease-in')
    ])
  ])
}
