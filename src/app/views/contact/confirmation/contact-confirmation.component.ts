import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: './contact-confirmation.component.html',
  styleUrls: ['./contact-confirmation.component.scss']
})
export class ContactConfirmationComponent {

  constructor(private router: Router) {
  }

  onBackButtonClick() {
    this.router.navigate(['/contact']);
  }

}
