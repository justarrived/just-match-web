import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "sm-progress",
  template: `<div [ngClass]="{'success': _progress === 100}" class="ui {{class}} progress" [attr.data-percent]="_progress">
  <div class="bar" [ngStyle]="{'width': _progress + '%'}">
    <div class="progress">{{_progress}}%</div>
  </div>
  <div class="label" *ngIf="label">{{label}}</div>
</div>`
})
export class SemanticProgressComponent {
  @Input() label: string;
  @Input() class: string;
  _progress: number = 0;

  @Input()
  set progress(value: number) {
    this._progress = (value >= 100) ? 100 : value;
  }
}
