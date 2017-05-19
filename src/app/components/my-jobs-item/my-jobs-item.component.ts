import {Application} from '../../models/api-models/application/application';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {JARoutes} from '../../routes/ja-routes/ja-routes';
import {NavigationService} from '../../services/navigation.service';
import {Language} from '../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';


@Component({
  selector: 'my-jobs-item',
  templateUrl: './my-jobs-item.component.html',
  styleUrls: ['./my-jobs-item.component.scss']
})
export class MyJobsItemComponent implements OnInit, OnDestroy {
  @Input() public application = null as Application;
  @Input() public section: string;

  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public constructor(
    private navigationService: NavigationService,
    private systemLanguagesResolver: SystemLanguagesResolver
  ) {
  }

  public ngOnInit(): void {
    this.initSystemLanguage()
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }

  public onListItemClick() {
    this.navigationService.navigate(JARoutes.job, this.application.job.id);
  }
}
