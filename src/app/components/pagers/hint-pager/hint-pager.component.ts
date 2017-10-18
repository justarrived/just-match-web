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
    <div class="ui grid">

      <div class="column seven wide">
        <div
          *ngIf="canGoBack"
          (click)="onPreviousPageButtonClick()"
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
              textAlignmentRtr="left">
            </basic-text>
            <basic-text
              [text]="hintPrevious"
              fontSize="small"
              marginTop="0"
              marginBottom="0"
              textAlignmentLtr="left"
              textAlignmentRtr="left">
            </basic-text>
          </div>
        </div>
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
        <div
          *ngIf="canGoToNext"
          (click)="onNextPageButtonClick()"
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
              textAlignmentRtr="right">
            </basic-text>
            <basic-text
              [text]="hintNext"
              fontSize="small"
              marginTop="0"
              marginBottom="0"
              textAlignmentLtr="right"
              textAlignmentRtr="right">
            </basic-text>
          </div>
        </div>
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
}
