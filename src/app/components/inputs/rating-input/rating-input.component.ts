import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {ElementRef} from "@angular/core";
import {EventEmitter} from '@angular/core';
import {Inject} from "@angular/core";
import {Input} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Output} from '@angular/core';
import {PLATFORM_ID} from "@angular/core";
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  selector: 'rating-input',
  template: `
    <div
      #rating
      class="ui {{size}} {{type}} rating">
    </div>`
})
export class RatingInputComponent extends BaseComponent {
  @Input() public initialRating: number;
  @Input() public maxRating: number;
  @Input() public size: string = '';
  @Input() public type: string = 'star';
  @Output() onRate: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild("rating") rating: ElementRef;

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public afterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      jQuery(this.rating.nativeElement)
        .rating({
          initialRating: this.initialRating || 0,
          maxRating: this.maxRating || 5,
          onRate: (value: number) => {
            this.onRate.emit(value);
          }
        });
    }
  }
}
