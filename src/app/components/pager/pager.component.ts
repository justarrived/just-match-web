import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit, OnChanges {
  @Input() maxResults: number;
  @Input() pageSize: number = 10;
  @Input() currentPage: number;
  @Output() pageChange = new EventEmitter();

  private lastPage: number = 1;

  constructor() {
  }

  ngOnInit() {
    this.calculateLastPage();
  }

  ngOnChanges(changes: any): void {
    if (!changes.maxResults && !changes.pageSize) {
      return;
    }

    this.calculateLastPage();
  }

  onFirstPageButtonClick() {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
  }

  onPreviousPageButtonClick() {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage = this.currentPage - 1;
    this.pageChange.emit(this.currentPage);
  }

  onNextPageButtonClick() {
    if (this.currentPage === this.lastPage) {
      return;
    }

    this.currentPage = this.currentPage + 1;
    this.pageChange.emit(this.currentPage);
  }

  onLastPageButtonClick() {
    if (this.currentPage === this.lastPage) {
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
