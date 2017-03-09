import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {deleteElementFromArray} from '../../../utils/array-util';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Skill} from '../../../models/skill/skill';
import {SkillProxy} from '../../../services/proxy/skill-proxy.service';
import {OnInit} from '@angular/core';
import {some} from 'lodash';
import {TranslationListener} from '../../translation.component';
import {TranslationService} from '../../../services/translation.service';
import {UserSkill} from '../../../models/user/user-skill';

@Component({
  selector: 'skills-input',
  template: `
  <form
    class="ui form">
    <sm-loader
      [complete]="!loadingSkill"
      class="inverted"
      text="{{'component.loading' | translate}}">
    </sm-loader>
    <select-dropdown-input
      (onChange)="onAddSkill($event)"
      [apiErrors]="apiErrors"
      [control]="skillsControl"
      [data]="skills | async | orderBy: 'translated.name'"
      [label]="'input.skills.label' | translate"
      [placeholder]="'input.skills.placeholder' | translate"
      apiAttribute="skill_ids"
      dataItemLabelProoerty="translated.name"
      dataItemValueProoerty="id">
    </select-dropdown-input>
    <div *ngFor="let userSkill of userSkillsControl.value | orderBy: 'skill.translated.name'">
      <skill-proficiency-input
        (onDelete)="onRemoveUserSkill(userSkill)"
        (onRate)="onProficiencyChange($event, userSkill)"
        [initialRating]="userSkill.proficiency"
        [label]="userSkill.skill.translated.name"
        *ngIf="userSkill.proficiency">
      </skill-proficiency-input>
    </div>
  </form>`
})
export class SkillsInputComponent extends TranslationListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() skillsControl: FormControl;
  @Input() userSkillsControl: FormControl;

  public skills: Promise<Skill[]>;
  public loadingSkill: boolean;

  constructor(
    private skillProxy: SkillProxy,
    protected translationService: TranslationService
  ) {
    super(translationService);
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
      const userSkill = new UserSkill({ proficiency: 1 });
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
