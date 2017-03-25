import {Application} from '../../models/api-models/application/application';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'my-jobs-item',
  templateUrl: './my-jobs-item.component.html',
  styleUrls: ['./my-jobs-item.component.scss']
})
export class MyJobsItemComponent {
  @Input() public application = null as Application;
  @Input() public section: string;

  constructor(
    private navigationService: NavigationService
  ) {
  }

  private onListItemClick() {
    this.navigationService.navigate(JARoutes.job, this.application.job.id);
  }
}
