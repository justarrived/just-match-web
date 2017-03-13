import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {TranslationListener} from '../../translation.component';
import {TranslationService} from '../../../services/translation.service';
import {UserGender} from '../../../models/user/user-gender';
import {UserProxy} from '../../../services/proxy/user-proxy.service';

@Component({
  selector: 'gender-input',
  template: `
    <select-dropdown-input
      [apiErrors]="apiErrors"
      [data]="genders | async"
      [control]="control"
      [label]="'input.gender.label' | translate"
      [placeholder]="'input.gender.placeholder' | translate"
      apiAttribute="gender"
      dataItemLabelProoerty="translated.name"
      dataItemValueProoerty="id">
    </select-dropdown-input>`
})
export class GenderInputComponent extends TranslationListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;

  public genders: Promise<UserGender[]>;

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
    this.genders = this.userProxy.getGenders();
  }
}
