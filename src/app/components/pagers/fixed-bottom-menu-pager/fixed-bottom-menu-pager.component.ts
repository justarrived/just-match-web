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
        <a
          *ngIf="canGoBack"
          [routerLink]="previousUrl">
          <div
            class="pagination-button">
            <i class="fa fa-chevron-left"></i>
            <basic-text
              [text]="'fixed.bottom.menu.pager.previous' | translate"
              [uppercase]="true"
              color="white"
              fontSize="small"
              fontWeight="bold"
              marginTop="0"
              marginBottom="0"
              textAlignmentLtr="left"
              textAlignmentRtr="left">
            </basic-text>
          </div>
        </a>
      </div>

      <div
        class="column twelve wide">
        <div class="pagination-location">
          <i
            class="large white sidebar icon"
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
        <a
          *ngIf="canGoToNext"
          [routerLink]="nextUrl">
          <div
            class="pagination-button pagination-button-right">
            <i class="fa fa-chevron-right"></i>
            <basic-text
              [text]="'fixed.bottom.menu.pager.next' | translate"
              [uppercase]="true"
              color="white"
              fontSize="small"
              fontWeight="bold"
              marginTop="0"
              marginBottom="0"
              textAlignmentLtr="right"
              textAlignmentRtr="right">
            </basic-text>
          </div>
        </a>
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
  @Input() public nextUrl: string;
  @Input() public previousUrl: string;
  @Output() private toggleMenu = new EventEmitter();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onToggleMenuClick() {
    this.toggleMenu.emit();
  }
}
