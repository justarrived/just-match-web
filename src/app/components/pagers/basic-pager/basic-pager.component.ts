import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {OnChanges} from '@angular/core';
import {OnInit} from '@angular/core';
import {Output} from '@angular/core';

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
        {{currentPage}} / {{lastPage}}
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
export class BasicPagerComponent implements OnInit, OnChanges {
  @Input() public maxResults: number;
  @Input() public pageSize: number = 10;
  @Input() public currentPage: number;
  @Output() public pageChange = new EventEmitter();
  public lastPage: number = 1;

  public ngOnInit() {
    this.calculateLastPage();
  }

  public ngOnChanges(changes: any): void {
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
