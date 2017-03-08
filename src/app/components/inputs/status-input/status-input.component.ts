import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {UserStatus} from '../../../models/user/user-status';
import {UserProxy} from '../../../services/proxy/user-proxy.service';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {TranslationListener} from '../../translation.component';
import {TranslationService} from '../../../services/translation.service';

@Component({
  selector: 'status-input',
  template: `
    <select-dropdown-input
      [apiErrors]="apiErrors"
      [control]="control"
      [data]="statuses | async"
      [label]="'input.status.label' | translate"
      [placeholder]="'input.status.placeholder' | translate"
      apiAttribute="current_status"
      dataItemLabelProoerty="name"
      dataItemValueProoerty="id">
    </select-dropdown-input>`
})
export class StatusInputComponent extends TranslationListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;

  public statuses: Promise<UserStatus[]>;

  constructor(
    private userProxy: UserProxy,
    protected translationService: TranslationService
  ) {
    super(translationService);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData() {
    this.statuses = this.userProxy.getStatuses();
  }
}
