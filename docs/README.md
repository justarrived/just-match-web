# Docs - Just Match Web

Developer guide for Just Match Web.

## High level

* __Technology__
  - Angular 4
  - Typescript 2
  - SCSS
  - HTML5

* __Requirements__
  - yarn

* __Scripts__
  - bootstrap
    - install all the dependencies
  - pull-translations
    - fetch all transifex translations into src/assets/i18n
  - push-translations
    - push the en.json (english) translation in src/assets/i18n to transifex
  - server
    - start the dev mode server
  - setup
    - setup the project (also runs bootstrap)
  - update
    - update the project (also runs bootstrap)
* __Typescript conventions__

Imports
```
/*
Sorted and one import per line.
Examples:
*/
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {Country} from '../../../models/api-models/country/country';
import {CountryProxy} from '../../../services/proxy/country-proxy.service';
...

```

Constructor
```
/*
Sorted arguments and styled as below examples:
Examples:
*/

/*
With arguments and ... statements
*/
public constructor(
  private authManager: AuthManager,
  private countryProxy: CountryProxy,
  private formBuilder: FormBuilder,
  private languageProxy: LanguageProxy,
  private navigationService: NavigationService,
  private router: Router,
  private userProxy: UserProxy,
  protected systemLanguagesResolver: SystemLanguagesResolver
) {
  ...
}

/*
No arguments no statements
*/
public constructor(
) {
}

```

Promise resolution syntax
```

/*
With then and catch
*/
this.skillProxy.getSkill(skillId)
.then(skill => {
  userSkill.skill = skill;
  this.userSkillsControl.value.push(userSkill);
  this.loadingSkill = false;
})
.catch(errors => {
  this.loadingSkill = false;
});
```


* __HTML conventions__

Attribute alignment
```
<!--
One attribute.
Whole HTML element on one line.
Examples:
-->
<div class="fourteen wide mobile ten wide tablet eight wide computer column">

<h3 class="ui dividing header">
  {{'user.register.form.address.section.header' | translate}}
</h3>

<!--
Two or more attributes.
One attribute per line and sorted on attribute name.
Examples:
-->
<input-errors
  [apiErrors]="apiErrors"
  [control]="registerForm.controls['first_name']"
  apiAttribute="first_name">
</input-errors>
```


* __SCSS conventions__

Line length 120 characters

* __Routes__

* __Services__

* __Proxies__

* __Utility__

* __Constants__

* __Models__

* __Views__

* __Components__

Initialization

```
/*
All components with Initialization needs should override onInit.
No Initialization is allowed in the constructor and should instead be performed
in onInit.
*/
...
export class ContactFormComponent extends BaseComponent {
...
  public constructor(
    ...
  ) {
  }

  public onInit(): void {
    this.initForm();
  }
```

Teardown
```
/*
All components with Observable or EventEmitter subscriptions should override onDestroy and unsubscribe to avoid memory leaks.
*/
...
export class ContactFormComponent extends BaseComponent {
...
  public constructor(
    ...
  ) {
  }

  public onDestroy() {
    if (thissomeSubscription) { this.someSubscription.unsubscribe(); }
  }
```


Inline template vs seperate html file.
```
/*
100 or less lines of html -> inline the html:
*/
...
@Component({
  selector: 'api-errors',
  template: `
    <div
      *ngFor="let error of apiErrors"
      class="ui pointing red basic label">
      {{error.detail}}
    </div>`
})
export class ApiErrorsComponent implements OnInit {
  ...

/*
More than 100 lines of html -> seprate template file
*/
...
@Component({
  selector: 'contact-form',
  styleUrls: ['./contact-form.component.scss'],
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  ...
```

* __Assets__

* __Tests__

* __Errors & Monitoring__

* __Static Translations__

* __Documentation__
