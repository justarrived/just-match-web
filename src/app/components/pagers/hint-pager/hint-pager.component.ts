import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'hint-pager',
  styleUrls: ['./hint-pager.component.scss'],
  template: `
  <div class="pager-container">
    <div
      class="ui grid"
      [style.direction]="'ltr'">

      <div class="column seven wide">
        <a
          *ngIf="canGoBack"
          [routerLink]="previousUrl">
          <div
            class="pagination-button">
            <i class="fa fa-chevron-left"></i>
            <div class="pagination-button-text">
              <basic-text
                [text]="'hint.pager.previous' | translate"
                [uppercase]="true"
                color="gray"
                fontSize="small"
                fontWeight="bold"
                marginTop="0"
                marginBottom="0"
                textAlignmentLtr="left"
                textAlignmentRtl="left">
              </basic-text>
              <basic-text
                [text]="hintPrevious"
                fontSize="small"
                marginTop="0"
                marginBottom="0"
                textAlignmentLtr="left"
                textAlignmentRtl="left">
              </basic-text>
            </div>
          </div>
        </a>
      </div>

      <div
        class="column two wide">
        <div class="pagination-location">
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

      <div class="column seven wide">
        <a
          *ngIf="canGoToNext"
          [routerLink]="nextUrl">
          <div
            class="pagination-button pagination-button-right">
            <i class="fa fa-chevron-right"></i>
            <div class="pagination-button-text">
              <basic-text
                [text]="'hint.pager.next' | translate"
                [uppercase]="true"
                color="gray"
                fontSize="small"
                fontWeight="bold"
                marginTop="0"
                marginBottom="0"
                textAlignmentLtr="right"
                textAlignmentRtl="right">
              </basic-text>
              <basic-text
                [text]="hintNext"
                fontSize="small"
                marginTop="0"
                marginBottom="0"
                textAlignmentLtr="right"
                textAlignmentRtl="right">
              </basic-text>
            </div>
          </div>
        </a>
      </div>

    </div>
  </div>`
})
export class HintPagerComponent extends BaseComponent {
  @Input() public canGoBack: boolean;
  @Input() public canGoToNext: boolean;
  @Input() public currentPage: number;
  @Input() public currentSection: number;
  @Input() public hintNext: string;
  @Input() public hintPrevious: string;
  @Input() public lastPage: number = 1;
  @Input() public nextUrl: string;
  @Input() public previousUrl: string;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
