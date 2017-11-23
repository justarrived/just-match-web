import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'occupation-years-of-experience-input',
  template: `
    <div style="margin-bottom: 10px; display: flex; align-items: center; flex-wrap: wrap;">
      <years-of-experience-input
        [apiErrors]="apiErrors"
        [control]="control">
      </years-of-experience-input>
      <div class="ui tag pink label">
        <basic-text
          [text]="label"
          color="white"
          display="inline"
          fontSize="small"
          fontWeight="bold">
        </basic-text>
        <i
          class="delete icon"
          (click)="onDeleteIconClick()">
        </i>
      </div>
    </div>`
})
export class OccupationYearsOfExperienceComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public label: string;
  @Output() public onDelete = new EventEmitter();

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }


  public onDeleteIconClick() {
    this.onDelete.emit();
  }
}
