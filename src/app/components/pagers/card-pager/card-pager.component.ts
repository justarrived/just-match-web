import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'card-pager',
  styleUrls: ['./card-pager.component.scss'],
  template: `
  <div class="pager-container">
    <div class="ui grid">

      <div class="column two wide mobile seven wide tablet seven wide computer">
        <div (click)="onPreviousPageButtonClick()" class="pagination-button">
          <i class="fa fa-chevron-left"></i>
          <div class="pagination-button-text">
            <basic-text
              text="Föregående"
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
              text="Det här behöver du för att börja jobba i Sverige"
              fontSize="small"
              marginTop="0"
              marginBottom="0"
              textAlignmentLtr="left"
              textAlignmentRtr="left">
            </basic-text>
          </div>
        </div>
      </div>

      <div class="column twelve wide mobile two wide tablet two wide computer">
        <div class="pagination-location">
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

      <div class="column two wide mobile seven wide tablet seven wide computer">
        <div (click)="onNextPageButtonClick()" class="pagination-button pagination-button-right">
          <i class="fa fa-chevron-right"></i>
          <div class="pagination-button-text">
            <basic-text
              text="Nästa"
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
              text="Personnummer och samordningsnummer"
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
export class CardPagerComponent extends BaseComponent {
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
