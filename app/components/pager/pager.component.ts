import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'pager',
  templateUrl: 'pager.component.html',
  styleUrls: ['pager.component.css']
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
  }

  ngOnChanges(changes: any): void {
    console.log(changes);
    if (!changes.maxResults && !changes.pageSize) {
      return;
    }

    this.lastPage = Math.floor(this.maxResults / this.pageSize);

    if (this.maxResults % this.pageSize !== 0) {
      this.lastPage = this.lastPage + 1;
    }
    console.log(this.lastPage);
  }

  onFirstPageButtonClick() {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
    console.log(this.currentPage);
  }

  onPreviousPageButtonClick() {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage = this.currentPage - 1;
    this.pageChange.emit(this.currentPage);
    console.log(this.currentPage);
  }

  onNextPageButtonClick() {
    if (this.currentPage === this.lastPage) {
      return;
    }

    this.currentPage = this.currentPage + 1;
    this.pageChange.emit(this.currentPage);
    console.log(this.currentPage);
  }

  onLastPageButtonClick() {
    if (this.currentPage === this.lastPage) {
      return;
    }

    this.currentPage = this.lastPage;
    this.pageChange.emit(this.currentPage);
    console.log(this.currentPage);

  }

}
