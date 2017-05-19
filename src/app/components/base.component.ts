/**
 ** Author: Bex
 **
 ** Base component that all components shall extend.
 ** Provides access to the user (can be null) and systemLanguage (never null)
 ** for all components. And notifications by overriding systemLanguageChanged
 ** or userChanged.
 **
 ** All angular lifecycle hooks are setup here and one just needs to Override
 ** the application version of that hook. (example: ngOnInit -> onInit).
 **
 ** DO NOT EDIT THIS FILE WITHOUT PERMISSION!
 **/

import {AfterContentChecked} from '@angular/core';
import {AfterContentInit} from '@angular/core';
import {AfterViewChecked} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {DoCheck} from '@angular/core';
import {Language} from '../models/api-models/language/language';
import {OnChanges} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../resolvers/system-languages/system-languages.resolver';
import {User} from '../models/api-models/user/user';
import {UserResolver} from '../resolvers/user/user.resolver';

export abstract class BaseComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  public systemLanguage: Language;
  public user: User;

  private systemLanguageSubscription: Subscription;
  private userSubscription: Subscription;

  public constructor (
    private systemLanguagesResolver: SystemLanguagesResolver,
    private userResolver: UserResolver,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(changes);
  }

  public onChanges(changes: SimpleChanges): void {
    // Override to hook into ngOnChanges.
  }

  public ngOnInit(): void {
    this.initSystemLanguage();
    this.initUser();
    this.onInit();
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
      this.systemLanguageChanged(systemLanguage);
    });
  }

  public systemLanguageChanged(systemLanguage: SystemLanguage): void {
    // Override to act on system language changes.
  }

  private initUser(): void {
    this.user = this.userResolver.getUser();
    this.userSubscription = this.userResolver.getUserChangeEmitter().subscribe(user => {
      this.user = user;
      this.userChanged(user);
    });
  }

  public userChanged(user: User): void {
    // Override to act on user changes.
  }

  public onInit(): void {
    // Override to hook into ngOnInit.
  }

  public ngDoCheck(): void {
    this.doCheck();
  }

  public doCheck(): void {
    // Override to hook into ngDoCheck.
  }

  public ngAfterContentInit(): void {
    this.afterContentInit();
  }

  public afterContentInit(): void {
    // Override to hook into ngAfterContentInit.
  }

  public ngAfterContentChecked(): void {
    this.afterContentChecked();
  }

  public afterContentChecked(): void {
    // Override to hook into ngAfterContentChecked.
  }

  public ngAfterViewInit(): void {
    this.afterViewInit();
  }

  public afterViewInit(): void {
    // Override to hook into ngAfterViewInit.
  }

  public ngAfterViewChecked(): void {
    this.afterViewChecked();
  }

  public afterViewChecked(): void {
    // Override to hook into ngAfterViewChecked.
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
    if (this.userSubscription) { this.userSubscription.unsubscribe(); }
    this.onDestroy();
  }

  public onDestroy(): void {
    // Override to hook into ngOnDestroy.
  }
}
