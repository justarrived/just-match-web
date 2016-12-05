import {Component, Input} from '@angular/core';
import {Faq} from '../../models/faq';
import {Router} from '@angular/router';
import {UserManager} from '../../services/user-manager.service';

@Component({
  selector: 'faq-list-item',
  templateUrl: './faq-list-item.component.html',
  styleUrls: ['./faq-list-item.component.scss']
})
export class FaqListItemComponent {
  @Input() faq: Faq;
  isCompanyUser: boolean;

  constructor(private router: Router, private userManager: UserManager) {
    this.isCompanyUser = this.userManager.isCompanyUser();
  }
}
