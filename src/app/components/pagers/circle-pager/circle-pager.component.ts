import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'circle-pager',
  styleUrls: ['./circle-pager.component.scss'],
  template: `
  <div
    *ngIf="nbrOfPages != 1"
    class="row circle-pager">

    <div
      *ngFor="let number of numbers"
      class="circle-pager-button"
      [ngClass]="{'circle-pager-button-active': number == activePage}">
      <p>{{number}}</p>
    </div>

  </div>`
})
export class CirclePagerComponent implements OnInit {
  @Input() public activePage: number;
  @Input() public currentPage: number;
  @Input() public nbrOfPages: number;

  public numbers;

  public ngOnInit() {
    this.numbers = Array.from({length: this.nbrOfPages}, (v, k) => k+1);
  }

}
