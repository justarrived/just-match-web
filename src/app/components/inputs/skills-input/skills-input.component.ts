import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {deleteElementFromArray} from '../../../utils/array-util';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Skill} from '../../../models/api-models/skill/skill';
import {SkillProxy} from '../../../services/proxy/skill-proxy.service';
import {OnInit} from '@angular/core';
import {some} from 'lodash';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserSkill} from '../../../models/api-models/user/user-skill';

@Component({
  selector: 'skills-input',
  template: `
  <div class="ui form">
    <sm-loader
      [complete]="!loadingSkill"
      [promise]="skills"
      class="inverted"
      text="{{'component.loading' | translate}}">
    </sm-loader>
    <select-dropdown-input
      (onChange)="onAddSkill($event)"
      [apiErrors]="apiErrors"
      [control]="skillsControl"
      [data]="skills | async"
      [label]="'input.skills.label' | translate"
      [placeholder]="'input.skills.placeholder' | translate"
      apiAttribute="skill_ids"
      dataItemLabelProoerty="translatedText.name"
      dataItemValueProoerty="id">
    </select-dropdown-input>
    <div *ngFor="let userSkill of userSkillsControl.value">
      <skill-proficiency-input
        (onDelete)="onRemoveUserSkill(userSkill)"
        (onRate)="onProficiencyChange($event, userSkill)"
        [initialRating]="userSkill.proficiency"
        [label]="userSkill.skill.translatedText.name">
      </skill-proficiency-input>
    </div>
  </div>`
})
export class SkillsInputComponent extends SystemLanguageListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() skillsControl: FormControl;
  @Input() userSkillsControl: FormControl;

  public skills: Promise<Skill[]>;
  public loadingSkill: boolean;

  constructor(
    private skillProxy: SkillProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData(): void {
    this.skills = this.skillProxy.getSkills();
  }

  public onRemoveUserSkill(userSkill): void {
    deleteElementFromArray(this.userSkillsControl.value, userSkill);
  }

  public onProficiencyChange(value, userSkill): void {
    userSkill.proficiency = value;
  }

  public onAddSkill(skillId): void {
    if (skillId && !some(this.userSkillsControl.value, { skill: {id: skillId} })) {
      const userSkill = new UserSkill({});
      this.loadingSkill = true;
      this.skillProxy.getSkill(skillId).then((skill) => {
        userSkill.skill = skill;
        this.userSkillsControl.value.push(userSkill);
        this.loadingSkill = false;
      }).catch(errors => {
        this.loadingSkill = false;
      });
    }
  }
}
