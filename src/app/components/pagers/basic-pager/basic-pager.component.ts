import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'basic-pager',
  styleUrls: ['./basic-pager.component.scss'],
  template: `
  <div class="pager-container">
    <div class="ui equal width grid pager-inner-container">
      <div
        (click)="onFirstPageButtonClick()"
        class="column back-button">
        <i class="fa fa-chevron-left navigation-leftmost-arrow"></i>
        <i class="fa fa-chevron-left"></i>
      </div>

      <div class="column pagination-button">
        <div (click)="onPreviousPageButtonClick()">
          <i class="fa fa-chevron-left"></i>
        </div>
      </div>

      <div class="column pagination-text">
        <basic-title-text
          [alwaysLtrText]="true"
          [text]="currentPage + ' / ' + lastPage"
          color="gray"
          fontSize="tiny"
          marginBottom="0"
          marginTop="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>

      <div class="column pagination-button pagination-button-right">
        <div (click)="onNextPageButtonClick()">
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>

      <div
        (click)="onLastPageButtonClick()"
        class="column forward-button">
        <i class="fa fa-chevron-right"></i>
        <i class="fa fa-chevron-right navigation-rightmost-arrow"></i>
      </div>
    </div>
  </div>`
})
export class BasicPagerComponent extends BaseComponent {
  @Input() public maxResults: number;
  @Input() public pageSize: number = 10;
  @Input() public currentPage: number;
  @Output() public pageChange = new EventEmitter();
  public lastPage: number = 1;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.calculateLastPage();
  }

  public onChanges(changes: SimpleChanges): void {
    if (!changes.maxResults && !changes.pageSize) {
      return;
    }

    this.calculateLastPage();
  }

  public onFirstPageButtonClick() {
    if (this.currentPage <= 1) {
      return;
    }

    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
  }

  public onPreviousPageButtonClick() {
    if (this.currentPage <= 1) {
      return;
    }

    this.currentPage = this.currentPage - 1;
    this.pageChange.emit(this.currentPage);
  }

  public onNextPageButtonClick() {
    if (this.currentPage >= this.lastPage) {
      return;
    }

    this.currentPage = this.currentPage + 1;
    this.pageChange.emit(this.currentPage);
  }

  public onLastPageButtonClick() {
    if (this.currentPage >= this.lastPage) {
      return;
    }

    this.currentPage = this.lastPage;
    this.pageChange.emit(this.currentPage);
  }

  private calculateLastPage() {
    this.lastPage = Math.floor(this.maxResults / this.pageSize);

    if (this.maxResults % this.pageSize !== 0) {
      this.lastPage = this.lastPage + 1;
    }
  }
}
