import {AfterViewInit} from "@angular/core";
import {ChangeDetectionStrategy} from "@angular/core";
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Inject} from "@angular/core";
import {Input} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';
import {Output} from "@angular/core";
import {PLATFORM_ID} from "@angular/core";
import {ViewChild} from "@angular/core";

declare var jQuery: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "sm-rating",
  template: `
    <div
      #rating
      class="ui {{class}} rating">
    </div>`
})
export class SemanticRatingComponent implements AfterViewInit {
  @Input() class: string;
  @Input() initialRating: number;
  @Input() maxRating: number;
  @Output() onRate: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild("rating") rating: ElementRef;

  public constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {
  }

  public ngAfterViewInit(): void {
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
