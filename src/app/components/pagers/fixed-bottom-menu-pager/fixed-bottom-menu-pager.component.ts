import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'fixed-bottom-menu-pager',
  styleUrls: ['./fixed-bottom-menu-pager.component.scss'],
  template: `
  <div class="pager-container">
    <div class="ui grid">

      <div class="column two wide">
        <div
          *ngIf="canGoBack"
          (click)="onPreviousPageButtonClick()"
          class="pagination-button">
          <i class="fa fa-chevron-left"></i>
        </div>
      </div>

      <div
        class="column twelve wide">
        <div class="pagination-location">
          <i
            class="ui grid list layout icon"
            style="cursor: pointer;"
            (click)="onToggleMenuClick()">
          </i>
          <div
            *ngIf="currentSection"
            class="section-indicator">
            {{currentSection}}
          </div>
          <basic-text
            *ngIf="currentPage"
            [text]="currentPage + '/' +  lastPage"
            display="unset"
            fontSize="small"
            marginTop=".5rem"
            marginBottom="0"
            textAlignmentLtr="center"
            textAlignmentRtr="center">
          </basic-text>
        </div>
      </div>

      <div class="column two wide">
        <div
          *ngIf="canGoToNext"
          (click)="onNextPageButtonClick()"
          class="pagination-button pagination-button-right">
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>

    </div>
  </div>`
})
export class FixedBottomMenuPagerComponent extends BaseComponent {
  @Input() public canGoBack: boolean;
  @Input() public canGoToNext: boolean;
  @Input() public currentPage: number;
  @Input() public currentSection: number;
  @Input() public lastPage: number = 1;
  @Output() private toggleMenu = new EventEmitter();
  @Output() public next = new EventEmitter();
  @Output() public previous = new EventEmitter();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onPreviousPageButtonClick() {
    this.previous.emit();
  }

  public onNextPageButtonClick() {
    this.next.emit();
  }

  public onToggleMenuClick() {
    this.toggleMenu.emit();
  }
}
