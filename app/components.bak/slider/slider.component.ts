import {Component, OnInit, ElementRef, Input} from "@angular/core";
import {Job} from "../../models/job/job";
import {AuthManager} from "../../services/auth-manager.service";
import {UserManager} from "../../user-manager.service";

@Component({
    moduleId: module.id,
    selector: 'slider',
    templateUrl: 'slider.component.html',
    styleUrls: ['slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() jobs: Array<Job>;
  private slider: any;
  private sliderContainer: any;
  private lastFullyVisualizatedItemIndex: number;
  isCompanyUser: boolean = false;

  constructor(private sliderElement: ElementRef, private userManager: UserManager) {
    this.isCompanyUser = userManager.isCompanyUser();
  }

  ngOnInit() {
    this.slider = this.sliderElement.nativeElement.getElementsByClassName('slider')[0];
    this.sliderContainer = this.sliderElement.nativeElement.getElementsByClassName('slider-container')[0];
  }

  onSwipe(isLeftSwipe: boolean) {
    let firstItemContainerOffsetWidth = this.getFirstItemContainer().offsetWidth;
    let maxVisualizedItems = this.getMaxVisualisationItemContainers(firstItemContainerOffsetWidth);
    if (!this.lastFullyVisualizatedItemIndex) {
      this.lastFullyVisualizatedItemIndex = maxVisualizedItems;
    }

    let sliderContainerLeftPosition = parseInt(this.sliderContainer.style.left || 0);
    let pixelsValueForMovingSliderContainer = firstItemContainerOffsetWidth * maxVisualizedItems;

    if ((this.lastFullyVisualizatedItemIndex + maxVisualizedItems >= this.jobs.length) && isLeftSwipe) {
      this.sliderContainer.style.left = (((this.jobs.length * firstItemContainerOffsetWidth) - this.slider.offsetWidth) * -1) + 'px';
      this.lastFullyVisualizatedItemIndex = this.jobs.length;
    } else if ((this.lastFullyVisualizatedItemIndex - maxVisualizedItems <= maxVisualizedItems) && !isLeftSwipe) {
      this.sliderContainer.style.left = 0;
      this.lastFullyVisualizatedItemIndex = maxVisualizedItems;
    } else {
      let directionMultiplier = isLeftSwipe ? -1 : 1;
      let indexMultiplier = isLeftSwipe ? 1 : -1;
      this.sliderContainer.style.left = (sliderContainerLeftPosition + ((pixelsValueForMovingSliderContainer - 10) * directionMultiplier)) + 'px';
      this.lastFullyVisualizatedItemIndex  = this.lastFullyVisualizatedItemIndex + (maxVisualizedItems * indexMultiplier);
    }
  }

  onResize(event) {
    //TODO: make responsiveness on resizing
  }

  private getFirstItemContainer(): any {
    return this.sliderElement.nativeElement.getElementsByClassName('item-container')[0];
  }

  private getMaxVisualisationItemContainers(itemContainerWidth): number {
    return (this.slider.offsetWidth / itemContainerWidth);
  }
}
