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
            (click)="onToggleMenuClick()">
          </i>
          <div class="section-indicator">
            1
          </div>
          <basic-text
            text="2/6"
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
          (click)="onNextPageButtonClick()"
          class="pagination-button pagination-button-right">
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>

    </div>
  </div>`
})
export class FixedBottomMenuPagerComponent extends BaseComponent {
  @Input() public maxResults: number;
  @Input() public pageSize: number = 10;
  @Input() public currentPage: number;
  @Output() public pageChange = new EventEmitter();
  @Output() private onToggleMenu = new EventEmitter();
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

  public onToggleMenuClick() {
    this.onToggleMenu.emit()
  }
}
