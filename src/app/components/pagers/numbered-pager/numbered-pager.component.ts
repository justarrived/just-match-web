import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'numbered-pager',
  styleUrls: ['./numbered-pager.component.scss'],
  template: `
  <div
    class="pager-container"
    [ngClass]="{'dark': type === 'dark', 'light': type === 'light'}"
    [style.direction]="systemLanguage.direction">
    <div
      [style.direction]="systemLanguage.direction"
      class="pager-segment-container">
      <div
        *ngFor="let page of firstPages"
        (click)="goToPage(page)"
        class="pager-link"
        [class.active]="page === currentPage">
        <basic-text
          [text]="page"
          marginTop="0"
          marginBottom="0">
        </basic-text>
      </div>
      <basic-text
        *ngIf="lastPage > 3"
        text="&#x25CF;&#x25CF;&#x25CF;&#x25CF;"
        marginTop="0"
        marginBottom="0">
      </basic-text>
    </div>
    <div
      [style.direction]="systemLanguage.direction"
      *ngIf="currentPage > 3 && currentPage < lastPage - 2"
      class="pager-segment-container">
      <div
        *ngFor="let page of middlePages"
        (click)="goToPage(page)"
        class="pager-link"
        [class.active]="page === currentPage">
        <basic-text
          [text]="page"
          marginTop="0"
          marginBottom="0">
        </basic-text>
      </div>
      <basic-text
        text="&#x25CF;&#x25CF;&#x25CF;&#x25CF;"
        marginTop="0"
        marginBottom="0">
      </basic-text>
    </div>
    <div
      [style.direction]="systemLanguage.direction"
      *ngIf="lastPage > 3"
      class="pager-segment-container">
      <div
        *ngFor="let page of lastPages"
        (click)="goToPage(page)"
        class="pager-link"
        [class.active]="page === currentPage">
        <basic-text
          [text]="page"
          marginTop="0"
          marginBottom="0">
        </basic-text>
      </div>
    </div>
  </div>`
})
export class NumberedPagerComponent extends BaseComponent {
  @Input() public type: string = 'dark'; // Should be one of ['dark', 'light']
  @Input() public maxResults: number;
  @Input() public pageSize: number = 10;
  @Input() public currentPage: number;
  @Output() public pageChange = new EventEmitter();
  public lastPage: number = 1;
  public firstPages: number[] = [1,2];
  public middlePages: number[] = [3,4,5];
  public lastPages: number[] = [6,7];

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.currentPage = this.currentPage || 1;
    this.updatePages();
  }

  public onChanges(changes: SimpleChanges): void {
    this.updatePages();
  }

  public goToPage(page: number) {
    if (page < 1 || page > this.lastPage) {
      return;
    }

    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  private updatePages() {
    this.lastPage = Math.floor(this.maxResults / this.pageSize);

    if (this.maxResults % this.pageSize !== 0) {
      this.lastPage = this.lastPage + 1;
    }

    if (this.lastPage < 2) {
      this.firstPages = [1];
    } else {
      this.firstPages = [1,2];
      this.middlePages = [];
      this.lastPages = [this.lastPage - 1, this.lastPage];
      if (this.lastPage === 3 || (this.currentPage === 3 || this.currentPage === 2) && this.lastPage !== 4 && this.lastPage > 2) {
        this.firstPages.push(3);
        if (this.currentPage === 3 && this.lastPage !== 5 && this.lastPage > 3) {
          this.firstPages.push(4);
        }
      } else if ((this.currentPage === this.lastPage - 2 ||  this.currentPage === this.lastPage - 1) && this.lastPage !== 4) {
        this.lastPages.unshift(this.lastPage - 2);
        if (this.currentPage === this.lastPage - 2) {
          this.lastPages.unshift(this.lastPage - 3);
        }
      } else {
        this.middlePages = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
      }
    }
  }
}
